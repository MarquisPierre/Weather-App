const express = require('express')
const https = require('https')
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html")

})

app.post("/" , (req,res) =>{
   

    const query = req.body.cityName
    const apiKey = "7b6f7b103e33027174fbdae4aaa13f58"
    const unit = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units="  + unit
   
    https.get( url, (response)=>{
        
        console.log(response.statusCode)

        response.on("data", (data)=> {

         const weatherData = JSON.parse(data)
         const description = weatherData.weather[0].description
         const temp = weatherData.main.temp
         const icon = weatherData.weather[0].icon
         const imagURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
          console.log(https.statusCode);
         res.write(`<h1>The temperature in ${query} is ${temp} Degrees</h1>`)
         res.write(`<h2>The Weather is currently ${description}</h2>`)
         res.write(`<img src="${imagURL}">`)
         res.send()
       })
    })

})

app.listen(port , ()=> {
    console.log(`Sever is up and ready on port ${port}`)
})