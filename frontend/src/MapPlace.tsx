import {chakra} from "@chakra-ui/react";
import React from "react";
import useStyles from "./services/useStyles";
import windDirection, {Direction} from "./WindDirection";

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
	const styles = useStyles();
	const label = [weather.samenv, weather.temp + "°C", windDirection(weather.windrltr as Direction)].join(" / ");

	return (
		<>
			<ChakraSvgText fontSize={"16px"}>
				<tspan fill={styles.textColor} x={position[0]} y={position[1]}>{label}</tspan>
			</ChakraSvgText>
			<ChakraSvgText fontSize={"10px"}>
				<tspan fill={styles.textColor} x={position[0]} y={position[1] - 20}>{name}</tspan>
			</ChakraSvgText>
		</>
	);
};

export default MapPlace;