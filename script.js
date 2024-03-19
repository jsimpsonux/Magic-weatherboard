var apiKey = "09b0cfac23642f5c80a049c5ee5b97c4";

$( document ).ready(function() {

    var cityHistory = []
    var historyEL = document.getElementById("history");

    function init() {
        var history = localStorage.getItem("city-history");
        if(history){
            cityHistory = JSON.parse(history)
            displaySearchHistory()
        }
    }

    function saveCity(city) {

        if (cityHistory.indexOf(city) !== -1) {
            return
        }
        cityHistory.push(city)
        localStorage.setItem("city-history",JSON.stringify(cityHistory))
        displaySearchHistory()
    }

    function displaySearchHistory(){
      
      console.log(historyEL);
      historyEL.innerHTML = ""

      for (let i = cityHistory.length -1; i >= 0; i--) {
          var btn = document.createElement("button")
          btn.classList.add("history-btn", "btn", "btn-primary")
          btn.textContent = cityHistory[i]
          historyEL.append(btn)
      }
    }
    
        // var searchInput = $('#search-input').val().trim();
        // var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + apiKey;
        // var queryURL = " http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + apiKey;
    

        function displayWeather(city) {

            
            var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;
            saveCity(city)
    
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
    
                        var dateEl = document.getElementById(`forecast${i}`);
                        var temp = document.getElementById(`temp${i}`);
                        var humidity = document.getElementById(`humidity${i}`);
                        var icon = document.getElementById(`weathericon${i}`);
                        var iconUrl = 'https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';
                        
                        
    
                        icon.src = iconUrl;
                        dateEl.textContent = dayjs.unix(data.list[i].dt).format("DD/MM/YYYY")
                        temp.textContent = data.list[i].main.temp;
                        humidity.textContent = data.list[i].main.humidity;
                    }
    
    
                    
    
                });
    
    
            });
        }

        $("#search-button").on("click", function (event) {
            event.preventDefault();
            var searchInput = $('#search-input').val().trim();
            displayWeather(searchInput)
            

        });


function currentWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + apiKey)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        $("#today").empty()

        var foreCast = $("<p>").addClass("font-weight-bold text-primary").text(data.main.temp);
        var showWind = $("<p>").text(data.wind.speed);
        var showHumidity = $("<p>").text(data.main.humidity);
        var showPlace = $("<h1>").text(data.name);
        var icon = $("<img>");
        icon.attr("src",'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png')
        // var thisDate = currentDate.text(data.list.dt_text);
        var today = dayjs().format('DD/MM/YYYY');

        $("#today").append(showPlace, today, icon, foreCast, showWind, showHumidity)



    })

    function renderWeather(event) {
        if(event.target.matches(".history-btn")){
            let city = event.target.textContent;
            displayWeather(city);
        }
    }

    historyEL.addEventListener("click", renderWeather);
    init()
}

});
