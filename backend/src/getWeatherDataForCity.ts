import dayjs from "dayjs";
import {config} from "dotenv";
import * as fetch from "node-fetch";

config();

const API_KEY = process.env.API_KEY;

const getWeatherDataForCity = async ({city}) => {
	if(!city){
		return {};
	}

	const API_URL = `https://data.meteoserver.nl/api/uurverwachting_gfs.php?locatie=${city}&key=${API_KEY}`;
	console.log(API_URL);

	return await fetch(API_URL)
		.then(result => result.json())
		.then(result => {
			// result is now the raw data that comes from the API
			// Let's summarize this to get the most recent values out of it.
			const {plaatsnaam, data} = result;

			const newData = data.map(item => {
				const {tijd_nl, temp, windrltr, samenv} = item;

				return {
					time: dayjs(tijd_nl, "DD-MM-YYYY HH:mm"),
					temp,
					windrltr,
					samenv,
				};
			});

			return {...newData[0]};
		});
};

export default getWeatherDataForCity;