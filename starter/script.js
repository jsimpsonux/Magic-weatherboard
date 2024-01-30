$( document ).ready(function() {

    
        var apiKey = "09b0cfac23642f5c80a049c5ee5b97c4";
        var searchInput = $('#search-input').val().trim();
        var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + apiKey;
        // var queryURL = " http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + apiKey;

        var currentDate = $('#today');
    
    
        $("#search-button").on("click", function (event) {
            event.preventDefault()
            fetch(queryURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);

                fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=metric" + "&appid=" + apiKey)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data);



                })

                fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=metric" + "&appid=" + apiKey)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data);

                    for (var i = 0; i < data.list.length; i += 8) {

                        var foreCast = $("<p>").addClass("card card-body").text(data.list[i].main.temp);
                        var showWind = $("<p>").text(data.list[i].wind.speed);
                        var showHumidity = $("<p>").text(data.list[i].main.humidity);
                        var today = dayjs().format('L');
                        currentDate.text(data.list[i].dt_text);
        
                        $("#forecast").append(foreCast, showWind, showHumidity);
                    }

                });


            });
        });
});
