import axios from "axios";
const geoapify_api_key = "f6cc8cd100194b51b4fd3be9403c3fe1";
export function getMapPreview(props) {
	const previewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=800&height=800&center=lonlat:${props.lon},${props.lat}&zoom=15.5&apiKey=${geoapify_api_key}`;
	return previewUrl;
}

export async function getAddressFromCoords(coords) {
	const url = `https://geocode.maps.co/reverse?lat=${coords.lat}&lon=${coords.lon}`;
	const response = await axios
		.get(url)
		.then((res) => {
			return res.data.display_name;
		})
		.catch((err) => {
			console.log(err);
		});
	return response;
}
