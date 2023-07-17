const GOOGLE_API_KEY = "AIzaSyALaOSV9fxHBcIv_v0UFAbxdR_raFNuwCY";

export function getMapPreview(props) {
    const previewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.lat},${props.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.lat},${props.lng}&key=${GOOGLE_API_KEY}`;
    console.log(previewUrl)
	return previewUrl;
}
