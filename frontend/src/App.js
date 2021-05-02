import "./styles.css";
import RowItem from "./RowItem";
import {useEffect, useState} from "react";
import getData from "./getData";

const plaatsnamen = [
	"Arnhem",
	"Amersfoort",
	"Leeuwarden",
	"Middelburg",
	"Maastricht",
	"Utrecht",
];

const App = () => {
	const [data, setData] = useState({});

	useEffect(() => {
		plaatsnamen.map(city => {
			getData({city}).then(result => {
				setData(data => ({
					...data,
					[city]: result,
				}));
			});
		});
	}, []);

	return (
		<div className="App">
			<h2>Weergegevens:</h2>
			<p>Let op: elk bezoek doet 6 requests naar de API.</p>

			<table>
				<thead>
				<tr>
					<td> Plaatsnaam</td>
					<td> Tijdstip</td>
					<td> Samenvatting</td>
					<td> Temperatuur</td>
					<td> Windrichting</td>
				</tr>
				</thead>
				<tbody>
				{Object.keys(data).sort().map((d, i) => {
					return <RowItem key={i} city={d} data={data[d]} />;
				})}
				</tbody>
			</table>
		</div>
	);
};

export default App;
