const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

var appData = {
  pageTitle: 'Lstn app',
  appTitle: 'First Node lstn',
  welcomeMessage: 'Welcome to the web!'
};

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  //console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

//app.use((req, res, next) => {
//  res.render('maintenance.hbs', appData);
//});

app.get('/', (req, res) => {
  res.render('index.hbs', appData);
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'fault bad',
    code: 9292
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', appData);
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', appData);
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
