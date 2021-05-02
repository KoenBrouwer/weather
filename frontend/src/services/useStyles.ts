import {useColorModeValue} from "@chakra-ui/react";

const useStyles = () => {
	const mode = useColorModeValue("light", "dark");

	return {
		light: {
			sea: "#C6D9EA",
			country1: "#FEFEE9",
			country2: "#F5F5F5",
			border: "#FFF",
			border2: "#646464",
			waterEdge: "#406986",
			textColor: "#000",
		},
		dark: {
			sea: "#111314",
			country1: "#333333",
			country2: "#1A1A17",
			border: "#111",
			border2: "#111",
			waterEdge: "#060A0D",
			textColor: "#DDD",
		},
	}[mode];
};

export default useStyles;