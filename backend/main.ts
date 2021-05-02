import {config} from "dotenv";
import express from "express";
import Cache from "./src/Cache";
import getWeatherDataForCity from "./src/getWeatherDataForCity";
import cors from "cors";

config();

const cache = new Cache();
const app = express();
const port = process.env.APP_PORT || 3001;

/*
* Todo:
* - Change API to http://api.openweathermap.org/data/2.5/forecast?q=Amsterdam&appid=OPENWEATHERMAPAPIKEY
* */

app.use(cors());

app.get("/:city", async (req, res, next) => {
	const {city} = req.params;

	if (!city) {
		res.status(400).send(JSON.stringify({error: `City ${city} not found.`}, null, 2));
	}

	try {
		let data;
		data = cache.read(city);

		if (!data) {
			console.log(`Couldn't find weather data for ${city} in cache, getting it from API...`);

			// Get data from API
			const weatherApiData = await getWeatherDataForCity({city});
			console.log(weatherApiData);

			// Save data in cache
			cache.write(city, weatherApiData);

			data = cache.read(city);
		}

		res.contentType("application/json");
		res.send(JSON.stringify({data}, null, 2));
	} catch (err) {
		res.send(JSON.stringify({err}, null, 2));
	}
});

app.listen(port, () => {
	console.log("Server running.");
});
