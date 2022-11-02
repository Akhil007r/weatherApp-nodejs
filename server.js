// jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const {Json} = require("express")
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})
app.post("/",function(req,res){
    const apiid = "eaadae13d9fe0d6afebb92998855ca5a"
    const query = req.body.cityName;
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiid + "&units=" + units;
   https.get(url,function(response){
    response.on("data",function(data){
        const weatherdes = JSON.parse(data);
        const temp = weatherdes.main.temp;
        const icon = weatherdes.weather[0].icon;
        const url = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";
        res.write("<h1>The Temperature is "+ temp+ "degree");
        res.write("<img src="+url+">");
        res.send()
    })
   })
})
app.listen(4000,function(){
    console.log("server loc 4000")
})
