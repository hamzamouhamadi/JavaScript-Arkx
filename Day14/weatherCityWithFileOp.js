const fs = require('fs').promises;

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

async function read(path) {
    try {
        const data = await fs.readFile(path, 'utf8');
        return data;
    } catch (error) {
        console.log('Error reading file:', error);
        throw error;
    }
}

async function weather(lat, lng) {
    try {
        const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
        const result = await data.json();
        const temperature = result.current_weather.temperature;
        return temperature;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

async function main() {
    try {
        const city = await read('input.txt');
        const cityData = cities.find(c => c.name === city);
        if (cityData) {
            const temperature = await weather(cityData.lat, cityData.lng);
            await write(city, temperature);
        } else {
            throw new Error("La ville n'existe pas");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function write(city, temperature) {
    try {
        await fs.writeFile(`${city}.txt`, temperature.toString(), 'utf-8');
        console.log(`Weather data for ${city} written successfully.`);
    } catch (error) {
        console.error('Error writing file:', error);
        throw error;
    }
}

main();
