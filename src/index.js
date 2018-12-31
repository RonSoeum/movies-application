"use strict";

const $ = require ("jQuery");

import {
    getMoviesJson,
    renderIndexMovies,
    renderWishMovies,
    renderWishSelect,
    movieIndexByTitle,
    movieIndexByGenre,
    movieIndexByRating,
    err} from './api.js';

$(document).ready(function() {

    // Render Index Movies
    getMoviesJson().then(renderIndexMovies).catch(err);

    // Reset Index Movies
    $('#resetIndex').click(() => {
        $('#movies').empty();
        $('.loadingIndex').show();
        getMoviesJson().then(renderIndexMovies).catch(err);
    });

    // Real Time Search By Movie Title
    movieIndexByTitle();

    // Real Time Search By Movie Genre
    movieIndexByGenre();

    // Real Time Search By Movie Rating
    movieIndexByRating();

    // Render Wish Movies
    getMoviesJson().then(renderWishMovies).catch(err);

    // Render Wish Select Options
    renderWishSelect();

});// Ready