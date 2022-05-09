// console.log($.ajax("https://api.artic.edu/api/v1/artworks/129884"));
// Changes to www instead of api at start
// https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg

// VARIABLES
const dataURL = "https://api.artic.edu/api/v1/artworks/";
const search = "search?q=";
const publicDomain = "&query[term][is_public_domain]=true";

const imageURL = "https://www.artic.edu/iiif/2/";
const imageSize = "/full/110,/0/default.jpg";

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
  console.log(dataURL + search + userInput + publicDomain);
  $.ajax(dataURL + search + userInput + publicDomain).then(
    function (artSearch) {
      // The art object has an object called data inside it where all the info is kept.
      // data is an array of objects
      artSearch.data.forEach(function (artItem) {
        $.ajax(dataURL + artItem.id).then(function (artPiece) {
          $(".info").append(
            `<img src="${
              imageURL + artPiece.data.image_id + imageSize
            }"class="image"></img>`
          );
          $(".info").append(`<p class="text title">${artPiece.data.title}<br></p>`);
          
          $(".info").append(
            `<p class="text artist">Artist: ${artPiece.data.artist_titles}<br></p>`
          );
          $(".info").append(
            `<p class="text type">Type: ${artPiece.data.classification_titles}<br></p>`
          );
          // Write code that puts a space between each item
          $(".info").append(
            `<p class="text year">Year: ${artPiece.data.date_start}<br><br></p>`
          );

          // write code for if artwork has the same title, don't show
          // Write code for if there is not data for each item, don't display the line at all. returns null.
          // Write code for if, there is no artwork, don't show anything
        });
      });
    },

    function (error) {
      console.log("there is an error");
      console.log(error);
    }
  );
}

// function handleGetImage() {}
