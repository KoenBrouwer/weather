import dayjs from "dayjs";

const getData = ({city}) => {
	if(!city){
		return;
	}

	const API_URL = `https://data.meteoserver.nl/api/uurverwachting_gfs.php?locatie=${city}&key=${process.env.REACT_APP_API_KEY}`;

	return fetch(API_URL)
		.then(result => result.json())
		.then(result => {
			// result is now the raw data that comes from the API
			// Let's summarize this to get the most recent values out of it.
			const {plaatsnaam, data} = result;

			const newData = data.map(item => {
				const {tijd_nl, temp, windrltr, samenv} = item;

				return {
					time: dayjs(tijd_nl, "DD-MM-YYYY HH:mm").format("LLL"),
					temp,
					windrltr,
					samenv,
				};
			});

			return {
				meestRecent: newData[0],
			};
		});
};

export default getData;