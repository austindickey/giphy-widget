var apiKey = "Ixd4dkIi2CAphy1CFWUfbbGvDOZV0b0k"
var newGif

function callAPI() {

    $("#gifDisplay").empty()

    var searchTerm = $("#userInput").val()

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=10&offset=0&rating=R&lang=en"

    $("#userInput").val("")

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (var z = 0; z < 10; z++) {
            var containerDiv = $("<div>")
            containerDiv.addClass("individualGifs")
            var newImg = $("<img>")
            newImg.attr("src", response.data[z].images.fixed_height_still.url)
            newImg.addClass("gifs")
            newImg.attr("data-index", z)
            var rating = $("<p>")
            rating.addClass("rating")
            rating.text("Rating: " + response.data[z].rating)
            containerDiv.append(newImg)
            containerDiv.append(rating)
            $("#gifDisplay").append(containerDiv)
        }

        $(".gifs").on("click", function () {

            var picURL = $(this).attr("src")
            var gifIndex = $(this).data("index")

            if (picURL === response.data[gifIndex].images.fixed_height_still.url) {
                $(this).attr("src", response.data[gifIndex].images.fixed_height.url)
            } else {
                $(this).attr("src", response.data[gifIndex].images.fixed_height_still.url)
            }

        })

    })
}

$("#submitButton").on("click", function () {
    callAPI()
})

$(document).ready(function(){
    $("#userInput").keypress(function(e){
      if(e.keyCode==13)
      $("#submitButton").click()
    })
})