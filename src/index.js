"use strict";

const $ = require ("jQuery");
const {getMovies, catchError, fMovies, index} = require('./api.js');

$(document).ready(function() {

    getMovies().then((movies) => {
      console.log('Here are all the movies:');
      movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
      });
    }).catch(catchError);

    // Render Featured Movies
    getMovies().then(fMovies).catch(catchError);

    // Render Movie Index
    getMovies().then(index).catch(catchError);

});// Ready