import {Box, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import getWeatherDataByCity from "./services/api";

const plaatsnamen = ["Schagen", "Utrecht", "Goes", "Groningen", "Enschede", "Sittard"];

const App = () => {
	const [data, setData] = useState({});

	useEffect(() => {
		plaatsnamen.map(city => {
			getWeatherDataByCity(city).then(result => {
				setData(data => ({
					...data,
					[city]: result,
				}));
			});
		});
	}, []);

	return (
		<VStack h={"auto"} minHeight={"100vh"} minWidth={"100%"} w={"auto"} bg={"gray.100"}>
			<HStack width={"100%"} maxWidth={"1600px"} alignItems={"flex-start"} spacing={0}>
				<Box>
					<Text>Sidebar here</Text>
				</Box>

				<Box height={"100%"} minHeight={"100vh"} width={"100%"} p={5}>

					<Stack>
						<pre>{JSON.stringify(data, null, 2)}</pre>
					</Stack>

				</Box>
			</HStack>
		</VStack>
	);
};

export default App;