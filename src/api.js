"use strict";

const $ = require ("jQuery");

const getMovies = () => {
  return fetch('/api/movies')
      .then(response => response.json());
};

const err = (error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
};

// Featured Movies
// const fMovies = movies => {
//   $('#title-fMovie1').text(movies[0].title);
//   $('#title-fMovie2').text(movies[1].title);
//   $('#title-fMovie3').text(movies[2].title);
//   $('#title-fMovie4').text(movies[3].title);
//   $('#rating-fMovie1').text(movies[0].rating);
//   $('#rating-fMovie2').text(movies[1].rating);
//   $('#rating-fMovie3').text(movies[2].rating);
//   $('#rating-fMovie4').text(movies[3].rating);
// };

// Movie Index
const index  = (movies) => {
  $('#loading').hide();
  movies.forEach(({title, rating, id}) => {
    $('#movies').append(
        `<div class="card-body col-3"><h3>${title}</h3><p>${rating}</p></div>`
    );
  });
};

// Post Request Using Promise
let title = '';
let rating = '';

$('#addButton').click(() => {
  title = $('#title').val();
  rating = $('#rating').val();
  console.log(title);



  let newMovie = {title: title, rating: rating};
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMovie)
  };
  const postMovie = () => fetch('/api/movies', fetchOptions);
  postMovie();

});

module.exports = {
  getMovies,
  // fMovies,
  index,
  err
};

