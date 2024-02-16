const http = require("http");
const  url  = require("url");

//Declare an array of cities
const cities = [
    { "name": "New York", "lat": 40.7128, "lng": -74.0060 },
    { "name": "London", "lat": 51.5074, "lng": -0.1278 },
    { "name": "Paris", "lat": 48.8566, "lng": 2.3522 },
    { "name": "Tokyo", "lat": 35.6895, "lng": 139.6917 },
    { "name": "Sydney", "lat": -33.8651, "lng": 151.2099 },
    { "name": "Rome", "lat": 41.9028, "lng": 12.4964 },
    { "name": "Cairo", "lat": 30.0444, "lng": 31.2357 },
    { "name": "Rio de Janeiro", "lat": -22.9068, "lng": -43.1729 },
    { "name": "Dubai", "lat": 25.2048, "lng": 55.2708 },
    { "name": "Rabat", "lat": 34.0209, "lng": -6.8416 }
];

let findCItyByName = (name)=> cities.find(p=>p.name == name);

const fetchWeatherData = async(lat,lng)=>{
    const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
    return data.json();
};
let PORT = 3000;
const server = http.createServer(async(req, res) =>{
    try{
        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        const query = parsedUrl.query;

        if(path == "/weather"){
            const cityName = query.ville;

            const city = findCItyByName(cityName);
            if(!city){
                res.writeHead(404,{'Content-type' : 'text/plain'});
                res.end('City not found try again');
                return;
            }

            const weatherData = await fetchWeatherData(city.lat , city.lng);
            const temperature = weatherData.current_weather.temperature;
            res.writeHead(200, {'Content-type' : 'text/plain'});
            res.end(`--------------------Voile la temperature de ${cityName} : ${temperature}-------------------`);
        }else{
            res.writeHead(300,{'Content-type' : 'text/plain'});
            res.end('Bienvenu Entrer /weather dans URL')
        }
    }catch(err){
        res.writeHead(500, {"Content-Type" : "text/plain"});
        res.end("ERROR IN SERVER")
    }
});

server.listen(PORT,()=>{
    console.log(`The server listening to ${PORT}`);
})