// VARIABLES
const dataURL = "https://api.artic.edu/api/v1/artworks/";
const search = "search?q=";
const publicDomain = "&query[term][is_public_domain]=true";

const imageURL = "https://www.artic.edu/iiif/2/";
const imageSize = "/full/800,/0/default.jpg";

// ELEMENTS
const $title = $(".title"); // 'title'
const $artist = $(".artist"); // 'artist_titles'
const $type = $(".type"); // "classification_titles"
const $year = $(".year"); // 'date_start"

const $form = $("form");
const $input = $('input[type="text"]');

const $loadImage = $(".info, .imageItem");

// EVENT LISTENERS

$form.on("submit", handleGetData);
$loadImage.on("click", ".imageItem", showImage);

// FUNCTIONS

function handleGetData(event) {

  // Prevent default and clear past results.
  event.preventDefault();
  $(".info").empty();
  $(".image").empty();

  // Take user input and put it into the API
  const userInput = $input.val();
  $.ajax(dataURL + search + userInput + publicDomain).then(

    // Limit the amount of results here.

    // Searches for individual art items from results of user search.
    function (artSearch) {

      // The art object has an object called data inside it where all the info is kept.
      // data is an array of objects
      artSearch.data.forEach(function (artItem) {
        $.ajax(dataURL + artItem.id).then(function (artPiece) {

          // Don't show artPiece if it doesn't have all the details.
          if (artPiece.data.image_id == "null") {
            console.log(artPiece.data.image_id);
          }

          // Get image from API
          $(".info").append(
            `<img src="${
              imageURL + artPiece.data.image_id + imageSize
            }"class="imageItem"></img>`
          );

          // Get info from API
          $(".info").append(
            `<p class="text title">${artPiece.data.title}<br></p>`
          );
          $(".info").append(
            `<p class="text artist">Artist: ${artPiece.data.artist_titles}<br></p>`
          );
          $(".info").append(
            `<p class="text type">Type: ${artPiece.data.classification_titles}<br></p>`
          );
          $(".info").append(
            `<p class="text year">Year: ${artPiece.data.date_start}<br><br></p>`
          );

          
          // write code for if artwork has the same title, don't show
          // Write code for if there is not data for each item, don't display the line at all. returns null.
          // Write code for if, there is no artwork, don't show anything REMOVE, or map and then filter.
          // if (artist.title doesn't exist) return null.
          //
          // limit search results to 10 pagenation. throttle. debounce.
        });
      });
    },

    function (error) {
      console.log("there is an error");
      console.log(error);
    }
  );
}

function showImage(event) {
  // Clears previous art displayed.
  $(".artAPI").empty();

  // Clones and removes css form original
  const newImage = event.target.cloneNode(true);
  newImage.classList.remove("imageItem");

  // Adds CSS for artwork display and puts it in the frame.
  newImage.classList.add("artAPI");
   $(".artAPI").append(newImage);
   
  // Add fade out and fade in.
}
