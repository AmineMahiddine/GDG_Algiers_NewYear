const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();

const db = monk(process.env.MONGO_URI || 'localhost/gdgnewyear');

db.then(() => {
  console.log('Connected correctly to server')
})


const msgs = db.get('msgs');
const filter = new Filter();

app.enable('trust proxy');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World 💖'
  });
});

app.get('/msgs', (req, res, next) => {
  msgs
    .find()
    .then(msgs => {
      res.json(msgs);
    }).catch(next);
});

app.get('/v2/msgs', (req, res, next) => {
  // let skip = Number(req.query.skip) || 0;
  // let limit = Number(req.query.limit) || 10;
  let { skip = 0, limit = 5, sort = 'desc' } = req.query;
  skip = parseInt(skip) || 0;
  limit = parseInt(limit) || 5;

  skip = skip < 0 ? 0 : skip;
  limit = Math.min(50, Math.max(1, limit));

  Promise.all([
    msgs
      .count(),
    msgs
      .find({}, {
        skip,
        limit,
        sort: {
          created: sort === 'desc' ? -1 : 1
        }
      })
  ])
    .then(([total, msgs]) => {
      res.json({
        msgs,
        meta: {
          total,
          skip,
          limit,
          has_more: total - (skip + limit) > 0,
        }
      });
    }).catch(next);
});

function isValidMew(mew) {
  return mew.name && mew.name.toString().trim() !== '' && mew.name.toString().trim().length <= 50 &&
    mew.content && mew.content.toString().trim() !== '' && mew.content.toString().trim().length <= 140;
}

app.use(rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 1
}));

const createMew = (req, res, next) => {
  if (isValidMew(req.body)) {
    const mew = {
      name: filter.clean(req.body.name.toString().trim()),
      content: filter.clean(req.body.content.toString().trim()),
      created: new Date(),
      bgc: generate()
    };

    msgs
      .insert(mew)
      .then(createdMew => {
        res.json(createdMew);
      }).catch(next);
  } else {
    res.status(422);
    res.json({
      message: 'Hey! Name and Content are required! Name cannot be longer than 50 characters. Content cannot be longer than 140 characters.'
    });
  }
};

app.post('/msgs', createMew);
app.post('/v2/msgs', createMew);

app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    message: error.message
  });
});

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
});



// random gradien generator

function generate() {

  let hexValues = ["1", "3", "4", "6", "8", "9", "a"];

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 6);
      let y = hexValues[x];
      a += y;
    }
    return a;
  }

  let newColor1 = populate('#');
  let newColor2 = populate('#');
  let angle = Math.round(Math.random() * 360);

  gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";
  return gradient;
}
