import React, { useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import CText from "../ui/CText";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import PrimaryButton from "../ui/PrimaryButton";

const Map = (props) => {
	const [selectedLocation, setSelectedLocation] = useState();

	const region = {
		latitude: 37.78,
		longitude: -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};
	const selectLocationHandler = (event) => {
		// console.log(event);
		const lat = event.nativeEvent.coordinate.latitude;
		const lon = event.nativeEvent.coordinate.longitude;
		console.log(lat, lon);
		setSelectedLocation({
			lat: lat,
			lon: lon,
		});
	};

	const savePickLocationHandler = useCallback(() => {
		console.log(selectedLocation);
		if (!selectedLocation) {
			Alert.alert(
				"No Location Selected",
				"Please select a location first",
				[{ text: "Okay" }]
			);
			return;
		}
		props.navigation.navigate("AddPlace", {
			pickedLocation: selectedLocation,
		});
	}, [selectedLocation]);

	useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<PrimaryButton
					iconName="checkmark"
					onPress={savePickLocationHandler}
				>
					Save
				</PrimaryButton>
			),
		});
	}, [props.navigation, selectedLocation]);

	return (
		<MapView
			style={{ height: "100%", width: "100%" }}
			initialRegion={region}
			onPress={selectLocationHandler}
		>
			{selectedLocation && (
				<Marker
					coordinate={{
						latitude: selectedLocation.lat,
						longitude: selectedLocation.lon,
					}}
					title="Picked Location"
				/>
			)}
		</MapView>
	);
};

export default Map;
