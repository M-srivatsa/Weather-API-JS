document.getElementById('city-name').addEventListener('keydown', function (e) {
    var value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
        getWeather();
    }
    });

    function getWeather() {

        var myNode = document.getElementById("container");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        var weather = new XMLHttpRequest();
        var city = document.getElementById('city-name').value;
        weather.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&APPID=baf667511e3b4db9a77d970137978481", true);
        weather.send();

        document.getElementById("city-name").value="";

         weather.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                let temp = response.main.temp;
                document.getElementById("container").innerHTML = "<p id=\"result\">"+city.toUpperCase()+" : "+temp+"&deg;C</p>";
            }
            else if (this.status == 404) {
                let response = JSON.parse(this.responseText);
                document.getElementById("container").innerHTML = "<p id=\"result\">"+response.message+"</p>";
            }
        };
    }