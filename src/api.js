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
      let stars = '';
      for (; rating >= 1; rating--){
        stars += `<i class="far fa-star"></i>`;
      }
      $('#movies').append(`<div class="card-body col-3"><div class=""><h2>${title}</h2><p>${genre}</p><h2>${stars}</h2></div></div>`);
    }
  })
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
            let stars = '';
            for (; rating >= 1; rating--){
              stars += `<i class="far fa-star"></i>`;
            }
            if(movie.title.toLowerCase().indexOf(word.toLowerCase()) != -1){
              $('#movies').append(`<div class="card-body col-3"><h2>${title}</h2><p>${genre}</p><p>${stars}</p></div>`);
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
            let stars = '';
            for (; rating >= 1; rating--){
              stars += `<i class="far fa-star"></i>`;
            }
            if(movie.genre.toLowerCase().indexOf(word.toLowerCase()) != -1){
              $('#movies').append(`<div class="card-body col-3"><h2>${title}</h2><p>${genre}</p><p>${stars}</p></div>`);
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
      if($('#search-rating option:selected').val() === `--search by rating--`){
        getMoviesJson().then(renderIndexMovies).catch(err);
      }else{
        movies.map(movie => {
          $('#search-rating option:selected').val().split(" ").map(function(word){
            let title = movie.title, genre = movie.genre, rating = movie.rating;
            if(movie.id < 33){
              let stars = '';
              for(; rating >= 1; rating--){
                stars += `<i class="far fa-star"></i>`;
              }
              if(movie.rating.indexOf(word) != -1){
                $('#movies').append(`<div class="card-body col-3"><h2>${title}</h2><p>${genre}</p><p>${stars}</p></div>`);
              }
            }
          });
        });
      }
    });
  });
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
      $('#wMovies').append(`<div class="card-body col-3 position-relative"><h2>${title}</h2>
        <button class="delete-button position-absolute btn" data-id="${id}">X</button><p>${genre}</p><p>${stars}</p></div>`);
    }
  })
};

// Render Select Option For Wish List
const renderWishSelect = () => {
  getMoviesJson().then(movies => {
    movies.map(({title, id}) => {
      if (id > 32) {
        $('#edit-movie').append(`<option value="${id}">${title}</option>`);
      }
    });
  });
};

// Post Request - Add Movie To Wish List
$('#add-button').click(() => {
  $('.loadingWish').show();
  title = $('#title').val();
  genre = $('#genre').val();
  rating = $('#rating').val();
  fetch('/api/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title: title, genre: genre, rating: rating})
  });
  $('#wMovies').empty();
  getMoviesJson().then(renderWishMovies).catch(err);
  $("#edit-movie > *:not('.not-remove')").remove();
  renderWishSelect();
});

// Put Request - Edit Movie In Wish List
$('#edit-button').click(() => {
  $('.loadingWish').show();
  title = $('#title').val();
  genre = $('#genre').val();
  rating = $('#rating').val();
  let id = $('#edit-movie option:selected').val();
  fetch(`/api/movies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title: title, genre: genre, rating: rating})
  });
  $('#wMovies').empty();
  getMoviesJson().then(renderWishMovies).catch(err);
  $("#edit-movie > *:not('.not-remove')").remove();
  renderWishSelect();
});


// Delete Request - Delete Movie From Wish List
$('#wMovies').on('click', ".delete-button", (e) => {
  let id = $(e.target).data('id');
  if(confirm("Do you want to delete this from the list?")){
    fetch(`/api/movies/${id}`, {method: 'DELETE'});
    $('.loadingWish').show();
    $('#wMovies').empty();
    getMoviesJson().then(renderWishMovies).catch(err);
    $("#edit-movie > *:not('.not-remove')").remove();
    renderWishSelect();
  }
});

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

