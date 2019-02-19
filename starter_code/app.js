
const express = require('express');
const hbs     = require('express-handlebars');
const app     = express();
const path    = require('path');



app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

app.engine( 'hbs', hbs( { 
  extname: 'hbs', 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );


//call index
app.get('/', (req, res) => {
  res.render('index');
});

//call an object with beers details
const beersObject = require('./beersObject.json')

app.get('/beers',(req, res, next) => {
  res.render('beers', {beers: beersObject});
})

//call random beers
var getRandomBeer = () => {
  var i = Math.floor(Math.random() * beersObject.length);
  return i;
};

var randomIndex = getRandomBeer();
var randomBeerObject = beersObject[randomIndex];

app.get('/randomBeer', (req, res) => {
  // console.log(randomBeerObject)
  res.render('randomBeer', {randomBeerObject: randomBeerObject})
});

//call footer
app.get('/footer', (req, res) => {
  res.render('footer');
});


app.listen(3000, () => {
  console.log("listening")
})
