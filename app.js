const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
	//console.log(req.body.city);
	const city = req.body.city;
	const appid = "c9f2418ddce8ec32b173f80e2fe2bfec";
	const unit = "metric";
	const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&q=" + city + "&units=" + unit;
	https.get(url, function(response){
		//console.log(response.statusCode);

		response.on("data", function(data){
			const weather = JSON.parse(data);
			//console.log(weather);
			const temp = weather.main.temp;
			const description = weather.weather[0].description;
			const icon = weather.weather[0].icon;
			const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
	        res.write("<p>The weather description of " + city + " is " + description + ".</p>");
	        res.write("<h1>The temperature here in " + city +  " is " + temp + " degrees Celsius.</h1>");
	        res.write("<img src = " + imgUrl + ">");
	        res.send();

			/*const object = {
				name: "Angela",
				favoriteFood: "Ramen"
			}
			console.log(JSON.stringify(object));*/
		});
	});
	
});


	

app.listen(3000, function(){
	console.log("Server is running on port 3000.");
})