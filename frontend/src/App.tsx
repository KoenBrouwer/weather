import {Box, useColorModeValue, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import MapPlace from "./MapPlace";
import getWeatherDataByCity from "./services/api";
import TheMap from "./TheMap";

const plaatsnamen = [
	{name: "Schagen", position: [241.04, 249]},
	{name: "Utrecht", position: [298.88, 425]},
	{name: "Goes", position: [95.15, 576]},
	{name: "Groningen", position: [530.03, 136]},
	{name: "Enschede", position: [544.63, 385]},
	{name: "Sittard", position: [415.44, 696]},
];

const App = () => {
	const [data, setData] = useState({});
	const bg = useColorModeValue("#FFF", "#000");

	useEffect(() => {
		plaatsnamen.forEach(city => {
			getWeatherDataByCity(city.name).then(result => {
				setData(data => ({
					...data,
					[city.name]: result.data,
				}));
			});
		});
	}, []);

	return (
		<VStack h={"auto"} minHeight={"100vh"} minWidth={"100%"} w={"auto"} bg={bg}>
			<Box height={"100%"} minHeight={"100vh"} width={"100%"}>

				<Box maxW={"60em"}>
					<TheMap>
						{plaatsnamen.map((p, i) => {
							const weather = data[p.name] || ({} as any);
							return (<MapPlace key={i} name={p.name} position={p.position} weather={weather} />);
						})}
					</TheMap>
				</Box>

			</Box>
		</VStack>
	);
};

export default App;