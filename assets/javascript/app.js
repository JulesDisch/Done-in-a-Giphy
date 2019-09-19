var topics = {
  Yankees: ["Brett Gardner", "Didi Gregorius", "Aaron Judge", "Gary Sanchez", "Aaron Hicks", "Gleyber Torres"]
}
// This function handles events where one button is clicked
$("#add-yankee").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();
  // This line will grab the text from the input box
  var newYankee = $("#yankee-input").val().trim();
  $("#yankee-input").val("");
  topics.Yankees.push(newYankee);
  console.log(topics.Yankees)
  renderTopic();
});
function renderTopic() {
  $("#buttons").empty();
  for (var i = 0; i < topics.Yankees.length; i++) {
    var yankeeBtn = $("<button>");
    yankeeBtn.attr("data-yankee", topics.Yankees[i]);
    yankeeBtn.text(topics.Yankees[i]);
    $("#buttons").append(yankeeBtn)
  }
  // Event listener for all button elements
  $("button").on("click", function () {
    $("#gifs-appear-here").empty();
    var yankee = $(this).attr("data-yankee");
    // Constructing a URL to search Giphy 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      yankee + "&api_key=ooDPmDwDsJjgy2ei3vg18DmM4ZSisk1k";
    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function (response) {
        // Storing an array of results in the results variable
        var results = response.data;
        // our array for our subject-appropriate gifs
        var goodArray = [];
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
          if ((results[i].username === "mlb") || (results[i].username === "yankees") || (results[i].source_tld === "www.pinstripealley.com")) {
            // limit our subject-appropriate gifs to 10
            goodArray.push(results[i])
            console.log(goodArray)
            if (goodArray.length === 11) {
              break;
            } else {
              // Creating a div for the gif
              var gifDiv = $("<div>");
              // Creating an image tag
              var yankeeImage = $("<img>");
              yankeeImage.addClass("yankee-image");
              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              yankeeImage.attr("src", results[i].images.fixed_height_still.url);
              yankeeImage.attr("data-state", "still");
              yankeeImage.attr("data-still", results[i].images.fixed_height_still.url);
              yankeeImage.attr("data-animate", results[i].images.fixed_height.url);
              // Storing the result item's rating and capitalizing it
              var rating = results[i].rating;
              rating.toUpperCase();
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating.toUpperCase());
              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(yankeeImage);
              gifDiv.append(p);
              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
              console.log(gifDiv)
              console.log(i)
              console.log(results[i].images);
            }
          }
        }
        $(".yankee-image").on("click", function () {
          var state = ($(this).attr("data-state"));
          console.log($(this).attr("data-state"))
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      });
  });
}
renderTopic();
