var topics = ["dog", "horse", "wolf", "panther", "lion", "bear", "kangaroo"]
var apiKey = "Ixd4dkIi2CAphy1CFWUfbbGvDOZV0b0k"
var newButton
var newGif
var userInput = ""

for (var i = 0; i < topics.length; i++) {
    newButton = $("#animalButtons").append("<button class='buttonGroup' data-name='" + topics[i] + "'>" + topics[i] + "</button>")
}

$("#submitButton").on("click", function() {
    userInput = $("#userInput").val()
    topics.push(userInput)
    createButtons()
    $("#userInput").val("")
})

function createButtons() {

    $("#animalButtons").empty()

    for (var y = 0; y < topics.length; y++) {
        newButton = $("#animalButtons").append("<button class='buttonGroup' data-name='" + topics[y] + "'>" + topics[y] + "</button>")
    }
    callAPI()
}

function callAPI() {

    $(".buttonGroup").on("click", function() {

        $("#animalDisplay").empty()
        
        var animal = $(this).data("name")
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + animal + "&limit=10&offset=0&rating=PG&lang=en"
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            for (var z = 0; z < 10; z++) {
                newGif = $("#animalDisplay").append("<img src='" + response.data[z].images.fixed_height_still.url + "' class='gifs' data-index='" + z + "'><span class='rating'>" + response.data[z].rating + "<span>")
            }
            
            $(".gifs").on("click", function() {

                var picURL = $(this).attr("src")
                var gifIndex = $(this).data("index")
          
                if (picURL === response.data[gifIndex].images.fixed_height_still.url) {
                    $(this).attr("src", response.data[gifIndex].images.fixed_height.url)
                } else {
                    $(this).attr("src", response.data[gifIndex].images.fixed_height_still.url)
                }
                
            });

        })
    })
}

callAPI()