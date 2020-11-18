$(document).ready(function () {

    //api key
    const apiKey = "8c1adef0d820f2f8926acb73d833b785";

    //submit button
    let citySearch = $("#city-submit");

    //hides empty img src and alt on screen
    $("#weather-icon").attr('class', 'hide');
    $("#fIcon1").attr('class', 'hide');
    $("#fIcon2").attr('class', 'hide');
    $("#fIcon3").attr('class', 'hide');
    $("#fIcon4").attr('class', 'hide');
    $("#fIcon5").attr('class', 'hide');

    //function when submit is clicked
    citySearch.on("click", function () {
        //variables for current day weather
        let weatherSearch = "https://api.openweathermap.org/data/2.5/weather?q=";
        let weatherAppid = "&appid=";
        let cityInput = $("#city-input").val();
        let unitsQuery = "&units=imperial";
        let today = new Date();
        var date = today.getMonth() + '/' + (today.getDate()) + '/' + today.getFullYear();

        //variables for future forecast
        let weatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
        let forecast = weatherForecast + cityInput + unitsQuery + weatherAppid + apiKey;

        //push to local storage
        let nameItem = cityInput
        window.localStorage.setItem(nameItem, JSON.stringify(cityInput));
        // return nameItem;
        var hisBtn = $("<button class='btn'>").attr("value", JSON.parse(localStorage.getItem(nameItem)));
        $("#history-section").append(hisBtn);


        //full weather api url after search is submitted
        let weather = weatherSearch + cityInput + unitsQuery + weatherAppid + apiKey;

        //ajax call to api to get weather
        $.ajax({
            url: weather,
            method: "GET"
        }).then(function (res) {
            //City name and date for current weather
            let cityName = res.name;
            $("#cityName").text(cityName + "(" + date + ")");

            //Weather Icon 
            let weatherIcon = res.weather[0].icon;
            let iconUrl = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
            $("#weather-icon").attr('src', iconUrl);
            $("#weather-icon").removeAttr('class');

            //humidity
            let humidity = res.main.humidity;
            $("#humidity").text("Humidity: " + humidity + "%");

            //Wind speed
            let windSpeed = res.wind.speed;
            $("#windSpeed").text("Wind Speed: " + windSpeed + " MPH");

            //temperature
            let temp = res.main.temp;
            $("#temperature").text("Temperature: " + temp + " °F");

            ///UV index///
            //variables taking lat and lon from current weather
            var latitude = res.coord.lat;
            var longitude = res.coord.lon;

            //uv index api url
            let uvIndexUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=";
            let lonQuery = "&lon=";
            let uvIndexSearch = uvIndexUrl + latitude + lonQuery + longitude + weatherAppid + apiKey;

            //ajax pull call for uv index
            $.ajax({
                url: uvIndexSearch,
                method: "GET"
            }).then(function (res) {
                let uvIndex = res.value;
                $("#uv-index").text("UV Index: " + uvIndex);
                if (uvIndex < 4) {
                    $("#uv-index").attr("class", "favorable");
                } else if (uvIndex >= 4 && uvIndex > 8) {
                    $("#uv-index").attr("class", "moderate");
                } else {
                    $("#uv-index").attr("class", "severe");
                }
            });

            //ajax pull call for 5 day forecast
            $.ajax({
                url: forecast,
                method: "GET"
            }).then(function (res) {
                var day1 = today.getMonth() + '/' + (today.getDate() + 1) + '/' + today.getFullYear();
                var day2 = today.getMonth() + '/' + (today.getDate() + 2) + '/' + today.getFullYear();
                var day3 = today.getMonth() + '/' + (today.getDate() + 3) + '/' + today.getFullYear();
                var day4 = today.getMonth() + '/' + (today.getDate() + 4) + '/' + today.getFullYear();
                var day5 = today.getMonth() + '/' + (today.getDate() + 5) + '/' + today.getFullYear();

                $("#day-1").text(day1);
                $("#day-2").text(day2);
                $("#day-3").text(day3);
                $("#day-4").text(day4);
                $("#day-5").text(day5);

                let fIcon1 = res.list[4].weather[0].icon;
                let iconUrl1 = "https://openweathermap.org/img/w/" + fIcon1 + ".png";
                $("#fIcon1").attr('src', iconUrl1);
                $("#fIcon1").removeAttr('class');

                let fTemp1 = res.list[4].main.temp;
                $("#fTemp1").text(fTemp1 + " °F");

                let fHumid1 = res.list[4].main.humidity;
                $("#fHumid1").text("H: " + fHumid1 + "%");


                let fIcon2 = res.list[12].weather[0].icon;
                let iconUrl2 = "https://openweathermap.org/img/w/" + fIcon2 + ".png";
                $("#fIcon2").attr('src', iconUrl2);
                $("#fIcon2").removeAttr('class');

                let fTemp2 = res.list[12].main.temp;
                $("#fTemp2").text(fTemp2 + " °F");

                let fHumid2 = res.list[12].main.humidity;
                $("#fHumid2").text("H: " + fHumid2 + "%");


                let fIcon3 = res.list[20].weather[0].icon;
                let iconUrl3 = "https://openweathermap.org/img/w/" + fIcon3 + ".png";
                $("#fIcon3").attr('src', iconUrl3);
                $("#fIcon3").removeAttr('class');

                let fTemp3 = res.list[20].main.temp;
                $("#fTemp3").text(fTemp3 + " °F");

                let fHumid3 = res.list[20].main.humidity;
                $("#fHumid3").text("H: " + fHumid3 + "%");


                let fIcon4 = res.list[28].weather[0].icon;
                let iconUrl4 = "https://openweathermap.org/img/w/" + fIcon4 + ".png";
                $("#fIcon4").attr('src', iconUrl4);
                $("#fIcon4").removeAttr('class');

                let fTemp4 = res.list[28].main.temp;
                $("#fTemp4").text(fTemp4 + " °F");

                let fHumid4 = res.list[28].main.humidity;
                $("#fHumid4").text("H: " + fHumid4 + "%");


                let fIcon5 = res.list[36].weather[0].icon;
                let iconUrl5 = "https://openweathermap.org/img/w/" + fIcon5 + ".png";
                $("#fIcon5").attr('src', iconUrl5);
                $("#fIcon5").removeAttr('class');

                let fTemp5 = res.list[36].main.temp;
                $("#fTemp5").text(fTemp5 + " °F");

                let fHumid5 = res.list[36].main.humidity;
                $("#fHumid5").text("H: " + fHumid5 + "%");
            });
        });
    });
});