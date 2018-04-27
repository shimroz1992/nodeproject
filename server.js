const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();



app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partial');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('toUpcase', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var now  = new Date().toString();
  var log = `${now} : ${req.method} : ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
    	console.log('Unable to append to console.log file');
    }
  });
  next();
});


app.use((req, res, next) => {
  res.render('maintance.hbs');
})

app.get('/', (req, res) => {
  //res.send('<h1>Hello from express!</h1>');
  // res.send({
  // 	name: "test",
  // 	hoppees: ['biking', 'movies']
  // });
  res.render('home.hbs', {
    currentPage: 'Home',
  	welcomeMessage: "welcome to node app"  	
  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
  	currentPage: 'About'
  });
});

app.get('/bad', (req, res) => {
  res.send({
  	errorMessage: 'bad request'
  });
});

app.listen(3000, () => {
	console.log('server is up on 3000');
});