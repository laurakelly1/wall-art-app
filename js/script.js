// VARIABLES
const dataURL = "https://api.artic.edu/api/v1/artworks/";
const search = "search?q=";
const publicDomain = "&query[term][is_public_domain]=true";

const imageURL = "https://www.artic.edu/iiif/2/";
const imageSize = "/full/200,/0/default.jpg";

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
  // Prevents default and clear past results.
  event.preventDefault();
  $(".info").empty();
  $(".image").empty();

  // Take user input and put it into the API
  const userInput = $input.val();
  $.ajax(dataURL + search + userInput + publicDomain).then(
   
    // Searches for individual art items from results of user search.
    function (artSearch) {

      artSearch.data.forEach(function (artItem) {
        $.ajax(dataURL + artItem.id).then(function (artPiece) {

          // Conditions of poor results.
          if (artPiece.data.image_id == null) return true;
          if (artPiece.data.title == "") return true;
          if (artPiece.data.artist_titles == "") {
            artPiece.data.artist_titles = "N/A"
          }
          if (artPiece.data.classification_titles == "") {
            artPiece.data.classification_titles = "N/A"
          }
          if (artPiece.data.date_start == "") {
            artPiece.data.date_start = "N/A"
          }

          // Get image from API
          $(".info").append(
            `<img src="${
              imageURL + artPiece.data.image_id + imageSize
            }"class="imageItem grow"></img>`
          );

          // Get info from API
          $(".info").append(
            `<p class="text title">${artPiece.data.title}<br></p>`
          );
          $(".info").append(
            `<p class="text artist">Artist: ${artPiece.data.artist_titles}<br></p>`
          );
          $(".info").append(
            `<p class="text type">Type: ${artPiece.data.classification_titles.join(
              ", "
            )}<br></p>`
          );
          $(".info").append(
            `<p class="text year">Year: ${artPiece.data.date_start}<br><br></p>`
          );

          // write code for if artwork has the same title, don't show
          // Write code for if there is not data for each item, don't display the line at all. returns null.
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
  newImage.classList.remove("imageItem", "grow");

  // Adds CSS for artwork display and puts it in the frame.
  newImage.classList.add("artAPI");

  $(".artAPI").append($(newImage).hide().fadeIn(500));

  // Add fade out and fade in.
}
