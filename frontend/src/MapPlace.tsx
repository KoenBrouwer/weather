import {chakra} from "@chakra-ui/react";
import React from "react";

const ChakraSvgText = chakra("text", {
	baseStyle: {
		fill: "black",
		fontFamily: "PublicSans-Medium, Public Sans",
		fontSize: "20px",
		letterSpacing: "-1.2",
	},
});

type Weather = {
	temp: number,
	windrltr: string,
	samenv: string,
}

const MapPlace: React.FC<{name: string, position: number[], weather: Weather}> = ({name, position, weather}) => {
	const label = [weather.samenv, weather.temp + "°C", weather.windrltr].join(" / ");

	return (
		<>
			<ChakraSvgText fontSize={"16px"}>
				<tspan x={position[0]} y={position[1]}>{label}</tspan>
			</ChakraSvgText>
			<ChakraSvgText fontSize={"10px"}>
				<tspan x={position[0]} y={position[1]-20}>{name}</tspan>
			</ChakraSvgText>
		</>
	);
};

export default MapPlace;