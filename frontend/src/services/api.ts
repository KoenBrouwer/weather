const getWeatherDataByCity = async (city: string) => {
	if (!city) {
		return;
	}

	const API_URL = `${process.env.REACT_APP_API_URL}/${city}`;

	return await fetch(API_URL)
		.then(result => result.json())
		.then(result => {
			console.log(result);
		});
};

export default getWeatherDataByCity;