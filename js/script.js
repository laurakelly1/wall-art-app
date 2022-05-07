// console.log($.ajax("https://api.artic.edu/api/v1/artworks/129884"));
// Changes to www instead of api at start
// https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg

// VARIABLES
const dataURL = "https://api.artic.edu/api/v1/artworks/129884";

// ELEMENTS
const $title = $(".title"); // 'title'
const $artist = $(".artist"); // 'artist_title'
const $type = $(".type"); // "classification_titles"
const $year = $(".year"); // 'date_start"

const $form = $('form');
const $input = $('input[type="text"]');

// EVENT LISTENERS

$form.on("submit", handleGetData);

// FUNCTIONS

function handleGetData(event) {
    event.preventDefault();
    
  $.ajax(dataURL).then(
    function (art) {
        // The art object has an object called data inside it where all the info is kept.
        $title.text(art.data.title);
        $artist.text(art.data.artist_title);
        $type.text(art.data.classification_titles);
        $year.text(art.data.date_start);
  },
    function (error) {
        console.log("there is an error");
        console.log(error);
    }
  );
}

// function handleGetImage() {}
