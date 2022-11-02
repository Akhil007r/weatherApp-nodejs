// jshint esversion:6
const { json } = require("express");
const express = require("express");
const bodyParser = require("body-parser")
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
// app.get("/",function(req,res){
//     https.get("https://api.openweathermap.org/data/2.5/forecast?q=bangalore&appid=eaadae13d9fe0d6afebb92998855ca5a&units=metric",function(response){
//         console.log(response)
//     });
//     res.send("server is running")
// })

// or 

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiid = "eaadae13d9fe0d6afebb92998855ca5a"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiid + "&units=" + units;
    https.get(url, function (response) {
        console.log(response.statusCode)
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data)
            console.log(weatherdata)
            const weatherdesc = weatherdata.weather[0].description
            const temp = weatherdata.main.temp
            const icon = weatherdata.weather[0].icon
            const descrip = weatherdata.weather[0].description
            const url = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p> The weather is currently " + weatherdesc)
            res.write("<h1> The temperature in " + query+ " is " + temp + " degree celcius</h1>")
            res.write("<h3>" + descrip + "</h3>")
            res.write("<img src=" +url + ">")
            res.send
        })
    });
})






app.listen(3000, function () {
    console.log("server is running at port 3000")
})