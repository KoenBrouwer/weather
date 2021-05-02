export type Direction = "N" | "NO" | "O" | "ZO" | "Z" | "ZW" | "W" | "NW" | string;

const directions: Record<Direction, string> = {
	"N": "⬆️",
	"NO": "↗️",
	"O": "➡️",
	"ZO": "↘️",
	"Z": "⬇️",
	"ZW": "↙️",
	"W": "⬅️",
	"NW": "↖️",
};

const windDirection = (direction: Direction): string => directions[direction] || direction;

export default windDirection;