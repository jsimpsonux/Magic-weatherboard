var apiKey = "09b0cfac23642f5c80a049c5ee5b97c4";

$( document ).ready(function() {

    
        // var searchInput = $('#search-input').val().trim();
        // var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + apiKey;
        // var queryURL = " http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + apiKey;

        var currentDate = $('#today');
    
    
        $("#search-button").on("click", function (event) {
            event.preventDefault()

            var searchInput = $('#search-input').val().trim();
            var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + apiKey;


            fetch(queryURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);

                currentWeather(data[0].lat, data[0].lon)

                fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=metric" + "&appid=" + apiKey)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data);



                    for (var i = 0; i < data.list.length; i += 8) {

                        // // var cardStyle = $("<div>").addClass("card").css("width: 18rem;");
                        // // var cardBody = cardStyle.prepend("<div class='card'></div>");

                        // var foreCast = $("<p>").addClass("font-weight-bold text-primary").text(data.list[i].main.temp);
                        // var showWind = $("<p>").text(data.list[i].wind.speed);
                        // var showHumidity = $("<p>").text(data.list[i].main.humidity);
                        // var thisDate = currentDate.text(data.list[i].dt_text);
                        // var columns = $("<div class='col'></div>");

                        // // var cardContent = cardBody.prepend(columns)

                        // columns.append(foreCast, showWind, showHumidity, thisDate);

        
                        // $("#forecast").append(columns);

                        var dateEl = document.getElementById(`forecast${i}`);
                        var temp = document.getElementById(`temp${i}`);
                        var humidity = document.getElementById(`humidity${i}`);
                        var icon = document.getElementById(`weathericon${i}`);
                        var iconUrl = 'https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';

                        icon.src = iconUrl;
                        dateEl.textContent = data.list[i].dt_txt;
                        temp.textContent = data.list[i].main.temp;
                        humidity.textContent = data.list[i].main.humidity;
                    }


                    

                });


            });

            // display here
            var storedCities = [];

            if (searchInput = data.name[i]){
                localStorage.setItem(storedCities, JSON.stringify() )
            }

            // if (var i = 0; i < data.name.length; i++) {

            // }

            

        });
});

function currentWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + apiKey)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);

        var foreCast = $("<p>").addClass("font-weight-bold text-primary").text(data.main.temp);
        var showWind = $("<p>").text(data.wind.speed);
        var showHumidity = $("<p>").text(data.main.humidity);
        var showPlace = $("<h1>").text(data.name);
        // var thisDate = currentDate.text(data.list.dt_text);
        var today = dayjs().format('DD/MM/YYYY');

        $("#today").append(showPlace, today, foreCast, showWind, showHumidity)



    })


}
