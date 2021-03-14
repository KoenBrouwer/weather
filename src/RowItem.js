import React from "react";

const RowItem = ({city, data}) => (
	<tr>
		<td> {city} </td>
		<td> {data.meestRecent.time} </td>
		<td> {data.meestRecent.samenv} </td>
		<td> {data.meestRecent.temp} °C</td>
		<td> {data.meestRecent.windrltr} </td>
	</tr>
);

export default RowItem;