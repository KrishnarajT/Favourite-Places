import * as SQLite from "expo-sqlite";
import Place from "../models/Place";

const db = SQLite.openDatabase("places.db");

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lon REAL NOT NULL);",
				[],
				() => {
					resolve();
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const insertPlace = (place) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO places (title, imageUri, address, lat, lon) VALUES (?, ?, ?, ?, ?);`,
				[
					place.title,
					place.imageURI,
					place.location.address,
					place.location.lat,
					place.location.lon,
				],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const fetchPlaces = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM places",
				[],
				(_, result) => {
					const places = [];
					for (const dp of result.rows._array) {
						places.push(
							new Place(
								dp.title,
								dp.imageUri,
								{
									address: dp.address,
									lat: dp.lat,
									lon: dp.lon,
								},
								dp.id
							)
						);
					}
					resolve(places);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const fetchPlaceDetails = (id) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM places WHERE id = ?",
				[id],
				(_, result) => {
					if (result.rows.length === 0) {
						reject("No place found");
					}
					const dbPlace = new Place(
						result.rows.item(0).title,
						result.rows.item(0).imageUri,
						{
							address: result.rows.item(0).address,
							lat: result.rows.item(0).lat,
							lon: result.rows.item(0).lon,
						},
						result.rows.item(0).id
					);
					resolve(dbPlace);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const deletePlace = (id) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"DELETE FROM places WHERE id = ?",
				[id],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};
