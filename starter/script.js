$( document ).ready(function() {

    
        var apiKey = "09b0cfac23642f5c80a049c5ee5b97c4";
        var searchInput = $('#search-input').val().trim();
        var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + apiKey;
        // var queryURL = " http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + apiKey;
    
    
        $("#form-input").on("click", function () {
            fetch(queryURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);

                var foreCast = $("<p>").text(data.list.main.temp);
                var showWind = $("<p>").text(data.list.wind.speed);
                var showHumidity = $("<p>").text(data.list.main.humidity);

                $("#forecast").append(foreCast, showWind, showHumidity);
            });
        });
});
