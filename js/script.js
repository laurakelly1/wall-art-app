// console.log($.ajax("https://api.artic.edu/api/v1/artworks/129884"));
// Changes to www instead of api at start
// https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg

// VARIABLES
const dataURL = "https://api.artic.edu/api/v1/artworks/";
const search = "search?q=";
const publicDomain = "&query[term][is_public_domain]=true";

// ELEMENTS
const $title = $(".title"); // 'title'
const $artist = $(".artist"); // 'artist_titles'
const $type = $(".type"); // "classification_titles"
const $year = $(".year"); // 'date_start"
const $artImg = $(".artImg");

const $form = $("form");
const $input = $('input[type="text"]');

// EVENT LISTENERS

$form.on("submit", handleGetData);

// FUNCTIONS

function handleGetData(event) {
  event.preventDefault();
  const userInput = $input.val();
  $.ajax(dataURL + search + userInput + publicDomain).then(
    function (artSearch) {
      // The art object has an object called data inside it where all the info is kept.
      // data is an array of objects
      artSearch.data.forEach(function (artItem) {
        $.ajax(dataURL + artItem.id).then(function (artPiece) {
          $("side").append(`<p class="title">${artPiece.data.title}<br></p>`);
          $("side").append(`<p class="title">${artPiece.data.artist_titles}<br></p>`);
          $("side").append(`<p class="title">${artPiece.data.classification_titles}<br></p>`);
          $("side").append(`<p class="title">${artPiece.data.date_start}<br><br></p>`);
        });
      });
      // in above, I want to search for painting.
    },

    function (error) {
      console.log("there is an error");
      console.log(error);
    }
  );
}

// function handleGetImage() {}
