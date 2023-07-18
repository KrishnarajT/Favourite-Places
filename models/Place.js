export default class Place {
	constructor(title, imageURI, location) {
		this.title = title;
		this.imageURI = imageURI;
		this.location = location; // { lat: 0, lng: 0 }
		this.id = new Date().toISOString() + Math.random().toString();
	}
}
