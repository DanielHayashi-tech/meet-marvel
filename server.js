// here we will load all of the things we need
var express = require('express');
var app = express();
const bodyParser  = require('body-parser');

// axios is required to make the connection
const axios = require('axios');

var selectedID = "";
app.use(bodyParser.urlencoded());

// set the view engine to ejs
app.set('view engine', 'ejs');


// calling the index file
app.get('/', function(req, res) {
  // store data in this array, the same array we store superhero data in from the superhero api
  superdata = [];
    // this will render our new example spage 
  res.render("pages/index.ejs");
});


app.post('/process_form', function(req, res){
  // we use axios,get to call the superhero api
  axios.get('https://superheroapi.com/api/1659153244435967/search/' + req.body.superhero)
  .then((response)=>
  {
    superdata = [];
    //pass data back to super data

    // I got this from this website: https://laracasts.com/discuss/channels/servers/get-data-out-from-axios-javascript
    const holder = response.data.results;
    // this pretty much holds my data temporarily
    if(holder)
    {
      // I used this website to reference how to map and element https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
      superdata = holder.map(element => ({aliases: element.biography["aliases"], image: element.image['url']}))
    }
    else
    {
      // no hases nada - do not do anything
    }
    // I wanna see what the information looks like
    console.log(superdata)
  // after clicking 'submit' this will run the index file
  res.render('pages/index', {body: req.body})

});
});

// here we specify what port this can easily be changed
app.listen(8081);
console.log('8081 is the magic port');