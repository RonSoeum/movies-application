"use strict";

const $ = require ("jQuery");
const {getMovies, err, index} = require('./api.js');

$(document).ready(function() {

    getMovies().then((movies) => {
      console.log('Here are all the movies:');
      movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
      });
    }).catch(err);

    // // Render Featured Movies
    // getMovies().then(fMovies).catch(err);

    // Render Movie Index
    getMovies().then(index).catch(err);

});// Ready