console.log('Hello World!');

const form = document.querySelector('form'); // grabbing an element on the page
const errorElement = document.querySelector('.error-message');
const loadingElement = document.querySelector('.loading');
const msgsElement = document.querySelector('.msgs');
const loadMoreElement = document.querySelector('#loadMore');
const API_URL = window.location.hostname === '127.0.0.1' ? 'http://localhost:5000/v2/msgs' : 'https://gdgnewyear-api.now.sh/v2/msgs';


let skip = 0;
let limit = 5;
let loading = false;
let finished = false;

errorElement.style.display = 'none';
loadingElement.style.display = 'none';
loadMoreElement.style.display = 'none';
document.querySelector('#loadMoreButton').addEventListener('click', () => {
  loadMore();
});

listAllmsgs();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');

  if (name.trim() && content.trim()) {
    errorElement.style.display = 'none';
    form.style.display = 'none';
    loadingElement.style.display = '';

    const mew = {
      name,
      content
    };

    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(mew),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType.includes('json')) {
          return response.json().then(error => Promise.reject(error.message));
        } else {
          return response.text().then(message => Promise.reject(message));
        }
      }
    }).then(() => {
      form.reset();
      setTimeout(() => {
        form.style.display = '';
      }, 30000);
      listAllmsgs();
    }).catch(errorMessage => {
      form.style.display = '';
      errorElement.textContent = errorMessage;
      errorElement.style.display = '';
      loadingElement.style.display = 'none';
    });
  } else {
    errorElement.textContent = 'Name and content are required!';
    errorElement.style.display = '';
  }
});

function loadMore() {
  skip += limit;
  listAllmsgs(false);
}

function listAllmsgs(reset = true) {
  loading = true;
  if (reset) {
    msgsElement.innerHTML = '';
    skip = 0;
    finished = false;
  }
  fetch(`${API_URL}?skip=${skip}&limit=${limit}`)
    .then(response => response.json())
    .then(result => {
      result.msgs.forEach(mew => {
        const div = document.createElement('div');
        if (mew.bgc) div.style.backgroundImage = mew.bgc;
        div.style.borderRadius = '8px';

        if (!mew.bgc) {
          div.style.borderBottom = '1px solid #f2f2f2';
          div.style.borderRadius = '';
        }
        // div.style.backgroundColor = '#42F4B9';
        div.style.backgroundSize = 'cover';
        div.style.margin = '12px 0';
        div.style.padding = '10px';

        const header = document.createElement('h3');
        header.textContent = mew.name;

        const contents = document.createElement('p');
        contents.textContent = mew.content;

        const date = document.createElement('small');
        const timeMewCreated = new Date(mew.created);
        const currentTime = new Date();
        let def = currentTime - timeMewCreated;

        let now = 'just Now';
        let min = Math.floor(def / (1000 * 60));
        let hour = Math.floor(def / (1000 * 60 * 60));
        let day = Math.floor(def / (1000 * 60 * 60 * 24));
        let year = Math.floor(def / (1000 * 60 * 60 * 24 * 365));

        let printdate = '';

        if (def > 1000 * 60 * 60 * 24 * 365) {
          printdate += ' ' + year + ' year  ';
        }
        if (def > 1000 * 60 * 60 * 24) {
          if (day > 365) day = day % 24;
          printdate += ' ' + day + ' day  ';
        }
        if (def > 1000 * 60 * 60) {
          if (hour > 24) hour = hour % 24;
          printdate += ' ' + hour + ' hour  ';
        }
        if (def > 1000 * 60) {
          if (min > 60) min = min % 60;
          printdate += min + ' min  ';
        }

        date.textContent = printdate + ' ago';
        if (def < 1000 * 60) {
          printdate = now;
          date.textContent = printdate;
        }

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);


        msgsElement.appendChild(div);

      });
      loadingElement.style.display = 'none';
      if (!result.meta.has_more) {
        loadMoreElement.style.visibility = 'hidden';
        finished = true;
      } else {
        loadMoreElement.style.visibility = 'visible';
      }
      loading = false;
    });
}




const hideAll = () => {
  document.querySelector('#app').style.display = 'none';
  document.querySelector('#click2020').style.display = 'none';
}
