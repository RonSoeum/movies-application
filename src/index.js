"use strict";

const $ = require ("jQuery");

import {
    getMoviesJson,
    renderIndexMovies,
    renderWishMovies,
    renderWishSelect,
    resetWishListForm,
    movieIndexByTitle,
    movieIndexByGenre,
    movieIndexByRating,
    err} from './api.js';

$(document).ready(() => {

    // Render Movie Index
    getMoviesJson().then(renderIndexMovies).catch(err);

    // Reset Movie Index With Button
    $('#resetIndex').click(() => {
        $("#resetIndex").prop("disabled", true);
        $("#search-form")[0].reset();
        $('#movies').empty();
        $('.loadingIndex').show();
        getMoviesJson().then(renderIndexMovies)
            .then(() => $("#resetIndex").prop("disabled", false)).catch(err);
    });

    // Render Wish List
    getMoviesJson().then(renderWishMovies).catch(err);

    // Render Select Option To Edit Wish List
    renderWishSelect();

    // Post Request - Add Movie To Wish List
    $('#add-button').click(() => {
        $('#add-button').prop("disabled", true);
        $('#wMovies').empty();
        $('.loadingWish').show();
        fetch('/api/movies', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: $('#title').val(),
                genre: $('#genre').val(),
                rating: $('#rating option:selected').val()
            })
        })
            .then(() => {
                getMoviesJson().then(renderWishMovies)
                    .then(() => $('#add-button').prop("disabled", false)).catch(err);
                resetWishListForm();
            }).catch(err);
    });

    // Put Request - Edit Movie In Wish List
    $('#edit-button').click(() => {
        $('#edit-button').prop("disabled", true);
        if($('#edit-movie option:selected').val() == 'default'){
            $('#edit-button').prop("disabled", false);
        }else{
            $('#wMovies').empty();
            $('.loadingWish').show();
            let id = $('#edit-movie option:selected').val();
            fetch(`/api/movies/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: $('#title').val(),
                    genre: $('#genre').val(),
                    rating: $('#rating option:selected').val()
                })
            })
                .then(() => {
                    getMoviesJson().then(renderWishMovies)
                        .then(() => $('#edit-button').prop("disabled", false)).catch(err);
                    resetWishListForm();
                }).catch(err);
        }
    });

    // Delete Request - Delete Movie From Wish List
    $('#wMovies').on('click', ".delete-button", (e) => {
        $('#wMovies').empty();
        $('.loadingWish').show();
        let id = $(e.target).data('id');
        if(confirm("Do you want to delete this from the list?")){
            fetch(`/api/movies/${id}`, {method: 'DELETE'})
                .then(() => {
                    getMoviesJson().then(renderWishMovies).catch(err);
                    resetWishListForm();
                }).catch(err);
        }
    });

    // Real Time Search By Movie Title
    movieIndexByTitle();

    // Real Time Search By Movie Genre
    movieIndexByGenre();

    // Real Time Search By Movie Rating
    movieIndexByRating();

});// Ready