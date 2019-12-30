# GDG-Algiers NEW_YEAR APP
### A basic CHAT ROOM WITH A GAME

## Description

A Project made to participate in GDG-Algires dev_challenge for the new year event
from 22/12/2019 to 29/12/2019

#### Pages
With the following features:

###### landing Page
[x] Conventual, Party Design
[x] fireWork animation on the background
[x] responsive
[x] About GDG-Algiers section
[x] contact section

###### Event Page
[x] Conventual, Party Design
[x] Chat Room made with nodeJS Express mongoDB
[x] A small game inspired by flappy bird
  * apreas on click
  * responsive
[x] fire work animation on the background
[x] A button that show a surprize on new years day
[x] responsive



## How to use

#### clone or download the project .zip file

`` git clone https://github.com/AmineMahiddine/GDG_Challenge_newYear.git``


#### Prerequisites

[x] nodeJS installed
[x] npm installed
[x] mongoDB installed

#### Install the Dependencies :

##### In the server derectory:
open a terminal and type

npm config user.name="<your name goes here>"
npm config user.email="<your email goes here>"

init a derectory with your info
 ``` npm init -y```

install express and morgan
morgan: HTTP request logger middleware for node.js
note: morgan is a middle-war libraries that logs all the incomming requests and will help while debugging
``` npm i express morgan```
install nodemon that will auto refresh whene a change is commited to the server
```npm i --save-dev nodemon```
install cors
CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
``` npm i cors```
install monk to talk to MongoDB
``` npm i monk```
install bad-words A javascript filter for badwords
``` npm init bad-words```
install express-rate-limit
Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
``` npm init express-rate-limit```
then
>type ``` npm run dev ```

##### In the server derectory

```npm i -g live-server```
then
>type ```live-server```

##### In the client/game derectory:

[x] Add the P5.js libraries from [click here](https://p5js.org/)
[x] Also you nedd to add p5.collide2d.js


###Licence
This Project is under the [MIT LICENCE]()
