"use strict";

// const $ = require ("jQuery");
import $ from "jquery";

// Get Request - Movie Data in JSON
const getMoviesJson = () => {
  return fetch('/api/movies')
      .then(response => response.json());
};

// Error Handler
const err = (error) => {
  console.log('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
};

// Get Request - Render Movie Index
const renderIndexMovies  = (movies) => {
  $('.loadingIndex').hide();
  movies.filter( ({title, genre, rating, id}) => {
    if(id < 33){
      let stars = '';
      for (; rating >= 1; rating--){
        stars += `<i class="far fa-star"></i>`;
      }
      $('#movies').append(`<div class="card-body col-3 border">
        <h2>${title}</h2><p>${genre}</p><h2>${stars}</h2></div>`);
    }
  })
};

// Get Request - Render Wish List
const renderWishMovies  = (movies) => {
  $('.loadingWish').hide();
  movies.filter( ({title, genre, rating, id}) => {
    if(id > 32){
      let stars = '';
      for (; rating >= 1; rating--){
        stars += `<i class="far fa-star"></i>`;
      }
      $('#wMovies').append(`<div class="card-body col-3 position-relative border"><h2>${title}</h2>
        <button class="delete-button position-absolute btn btn-white btn-sm" data-id="${id}">X</button>
        <p>${genre}</p><p>${stars}</p></div>`);
    }
  })
};

// Render Select Option To Edit Wish List
const renderWishSelect = () => {
  getMoviesJson().then(movies => {
    movies.map(({title, id}) => {
      if (id > 32) {
        $('#edit-movie-select').append(`<option value="${id}">${title}</option>`);
      }
    });
  });
};

// Real Time Search By Movie Title
const movieIndexByTitle = () => {
  $('#search-title').on('input', () => {
    getMoviesJson().then(movies => {
      $('#movies').empty();
      movies.map(movie => {
        $('#search-title').val().split(" ").map(word => {
          let title = movie.title, genre = movie.genre, rating = movie.rating;
          if(movie.id <33){
            let stars = '';
            for (; rating >= 1; rating--){
              stars += `<i class="far fa-star"></i>`;
            }
            if(movie.title.toLowerCase().indexOf(word.toLowerCase()) != -1){
              $('#movies').append(`<div class="card-body col-3 border">
                <h2>${title}</h2><p>${genre}</p><p>${stars}</p></div>`);
            }
          }
        })
      })
    });
  });
};

// Real Time Search By Movie Genre
const movieIndexByGenre = () => {
  $('#search-genre').on('input', () => {
    getMoviesJson().then(movies => {
      $('#movies').empty();
      movies.map(movie => {
        $('#search-genre').val().split(" ").map(word => {
          let title = movie.title, genre = movie.genre, rating = movie.rating;
          if(movie.id <33){
            let stars = '';
            for (; rating >= 1; rating--){
              stars += `<i class="far fa-star"></i>`;
            }
            if(movie.genre.toLowerCase().indexOf(word.toLowerCase()) != -1){
              $('#movies').append(`<div class="card-body col-3 border"><h2>${title}</h2>
                <p>${genre}</p><p>${stars}</p></div>`);
            }
          }
        })
      })
    });
  });
};

// Real Time Search By Movie Rating
const movieIndexByRating = () => {
  $('#search-rating').on('input', () => {
    getMoviesJson().then(movies => {
      $('#movies').empty();
      if($('#search-rating option:selected').val() === `search by rating...`){
        getMoviesJson().then(renderIndexMovies).catch(err);
      }else{
        movies.map(movie => {
          $('#search-rating option:selected').val().split(" ").map(word => {
            let title = movie.title, genre = movie.genre, rating = movie.rating;
            if(movie.id < 33){
              let stars = '';
              for(; rating >= 1; rating--){
                stars += `<i class="far fa-star"></i>`;
              }
              if(movie.rating.indexOf(word) != -1){
                $('#movies').append(`<div class="card-body col-3 border"><h2>${title}</h2>
                  <p>${genre}</p><p>${stars}</p></div>`);
              }
            }
          });
        });
      }
    });
  });
};

export {
  getMoviesJson,
  renderIndexMovies,
  renderWishMovies,
  renderWishSelect,
  movieIndexByTitle,
  movieIndexByGenre,
  movieIndexByRating,
  err
};