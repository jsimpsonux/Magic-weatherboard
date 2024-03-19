var apiKey = "09b0cfac23642f5c80a049c5ee5b97c4";

$( document ).ready(function() {

    // Setting up local storage and choosing the HTML tag where the local storage will appear.

    var cityHistory = []
    var historyEL = document.getElementById("history");

    // verfy the city that the user has inputted then execute the display history function will will display the history.

    function init() {
        var history = localStorage.getItem("city-history");
        if(history){
            cityHistory = JSON.parse(history)
            displaySearchHistory()
        }
    }

    // Saves the search input to local storage.

    function saveCity(city) {

        if (cityHistory.indexOf(city) !== -1) {
            return
        }
        cityHistory.push(city)
        localStorage.setItem("city-history",JSON.stringify(cityHistory))
        displaySearchHistory()
    }

    // This function creates the buttons and displays the buttons with bootstrap styling.

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

    // displayWeather function is where the data is fetched, query url accesses the api's city data and uses the api key to access it.
    // The second url fetches the data of the latitude and longitude, then converts the units into metric and again accesses the data using an api key.

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

                    // This for loop goes through the data.list and selects the element by ID by iterating through the HTML tags that go up by 8, then for each
                    // tag it will generate the date, temperature, humidity, and icon.
    
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

        // search button to initialise the search of what the user has inputted.

        $("#search-button").on("click", function (event) {
            event.preventDefault();
            var searchInput = $('#search-input').val().trim();
            displayWeather(searchInput)
            

        });

  // This function is to fetch the data again but this time it will generate the weather and data for only one card which will display the weather for today.  

function currentWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + apiKey)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        $("#today").empty()

        // #today will be emptied every time there is a new search, the code below creates the classes and places the data into those classes, there is also bootstrap to style the classes.
        // the icon code accesses the icon png so it can be displayed along with the rest of the data for the corresponding days, dayjs is another API for generating the right time or date
        // this is written in the format 'DD/MM/YYYY'

        var foreCast = $("<p>").addClass("font-weight-bold text-primary").text(data.main.temp);
        var showWind = $("<p>").text(data.wind.speed);
        var showHumidity = $("<p>").text(data.main.humidity);
        var showPlace = $("<h1>").text(data.name);
        var icon = $("<img>");
        icon.attr("src",'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png')
        // var thisDate = currentDate.text(data.list.dt_text);
        var today = dayjs().format('DD/MM/YYYY');

        // after creating classes and placing the data within each class we now append everything to be displayed in the id #today when a user clicks search.

        $("#today").append(showPlace, today, icon, foreCast, showWind, showHumidity)



    })

    // renderWeather checks if the event that has been triggered is ".history-btn" and then extracts the textContent and assigns it to the city variable
    // then displays the city.

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
