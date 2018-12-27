"use strict";

const $ = require ("jQuery");

let title, genre, rating;

// Get Request - Movie Data in JSON
const getMoviesJson = () => {
  return fetch('/api/movies')
      .then(response => response.json());
};

// Error Handler
const err = (error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
};

// Get Request - Render Movie Index
const renderIndexMovies  = (movies) => {
  $('.loadingIndex').hide();
  movies.filter( ({title, genre, rating, id}) => {
    if(id < 33){
      $('#movies').append(`<div class="card-body col-3">
        <h3>${title}</h3><p>${genre}</p><p>${rating}</p></div>`);
    }
  })
};

// Get Request - Render Wish List
const renderWishMovies  = (movies) => {
  $('.loadingWish').hide();
  movies.filter( ({title, genre, rating, id}) => {
    if(id > 32){
      $('#wMovies').append(`<div id="${id}" class="wish-movie card-body col-3">
        <h3 class="d-inline-block">${title}</h3><button class="delete-button float-right">X</button>
        <p>${genre}</p><p>${rating}</p></div>`);
    }
  })
};

// Post Request - Add New Movie
$('#addButton').click(() => {
  $('.loadingWish').show();
  title = $('#title').val();
  genre = $('#genre').val();
  rating = $('#rating').val();
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title: title, genre: genre, rating: rating})
  };
  fetch('/api/movies', fetchOptions);
  $('#wMovies').empty();
  getMoviesJson().then(renderWishMovies).catch(err);
});

// Delete Request - Delete Movie From Wish List
const deleteMovies = () => {
  $('#wMovies').on("click", ".delete-button", function () {
    let id = ($('.wish-movie').attr("id"));
    if(confirm("Do you want to delete this from the list?")){
      fetch(`/api/movies/${id}`, {method: 'DELETE'});
      $('.loadingWish').show();
      $('#wMovies').empty();
      getMoviesJson().then(renderWishMovies).catch(err);
    }
  });
};

// Real Time Search By Movie Title
const movieIndexByTitle = () => {
  $('#search-title').on('input', function(){
    getMoviesJson().then(movies => {
      $('#movies').empty();
      movies.map(movie => {
        $('#search-title').val().split(" ").map(function (word) {
          let title = movie.title, genre = movie.genre, rating = movie.rating;
          if(movie.id <33){
            if(movie.title.toLowerCase().indexOf(word.toLowerCase()) != -1){
              $('#movies').append(`<div class="card-body col-3"><h3>${title}</h3><p>${genre}</p><p>${rating}</p></div>`);
            }
          }
        })
      })
    });
  });
};

// Real Time Search By Movie Genre
const movieIndexByGenre = () => {
  $('#search-genre').on('input', function(){
    getMoviesJson().then(movies => {
      $('#movies').empty();
      movies.map(movie => {
        $('#search-genre').val().split(" ").map(function (word) {
          let title = movie.title, genre = movie.genre, rating = movie.rating;
          if(movie.id <33){
            if(movie.genre.toLowerCase().indexOf(word.toLowerCase()) != -1){
              $('#movies').append(`<div class="card-body col-3"><h3>${title}</h3><p>${genre}</p><p>${rating}</p></div>`);
            }
          }
        })
      })
    });
  });
};

// Real Time Search By Movie Rating
const movieIndexByRating = () => {
  $('#search-rating').on('input', function(){
    getMoviesJson().then(movies => {
      $('#movies').empty();
      movies.map(movie => {
        $('#search-rating').val().split(" ").map(function (word) {
          let title = movie.title, genre = movie.genre, rating = movie.rating;
          if(movie.id < 33){
            if(movie.rating.indexOf(word) != -1){
              $('#movies').append(`<div class="card-body col-3"><h3>${title}</h3><p>${genre}</p><p>${rating}</p></div>`);
            }
          }
        })
      })
    });
  });
};

export {
  getMoviesJson,
  renderIndexMovies,
  renderWishMovies,
  movieIndexByTitle,
  movieIndexByGenre,
  movieIndexByRating,
  deleteMovies,
  err
};

