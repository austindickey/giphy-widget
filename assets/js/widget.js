var topics = ["dog", "horse", "wolf", "panther", "lion", "bear", "kangaroo"]

var apiKey = "Ixd4dkIi2CAphy1CFWUfbbGvDOZV0b0k"

var animal

var queryURL

var newButton

var newGif

for (var i = 0; i < topics.length; i++) {
    newButton = $("#animalButtons").append("<button class='buttonGroup' data-name='" + topics[i] + "'>" + topics[i] + "</button>")
}

$(".buttonGroup").on("click", function(){

    $("#animalDisplay").empty()
    animal = $(this).data("name")
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + animal + "&limit=10&offset=0&rating=PG&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.data[0]);
        for (var z = 0; z < 10; z++) {
            newGif = $("#animalDisplay").append("<embed src='" + response.data[z].embed_url + "' class='gifs'><span class='rating'>" + response.data[z].rating + "<span>")
        }
    })
})

