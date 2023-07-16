class Place {
	constructor(title, imageURI, address, location) {
		this.title = title;
		this.imageURI = imageURI;
		this.address = address;
		this.location = location; // { lat: 0, lng: 0 }
		this.id = new Date().toISOString() + Math.random().toString();
	}
}
