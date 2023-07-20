import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import { View, StyleSheet, Alert } from "react-native";
import CText from "../ui/CText";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import PrimaryButton from "../ui/PrimaryButton";
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
} from "expo-location";

const Map = (props) => {
	const initialLocation = props.route.params
		? props.route.params.initialLocation
		: null;
	const [selectedLocation, setSelectedLocation] = useState(initialLocation);

	useEffect(() => {
		async function getLocation() {
			const location = await getCurrentPositionAsync({
				accuracy: 6,
			});
			console.log(location);
			setSelectedLocation({
				lat: location.coords.latitude,
				lon: location.coords.longitude,
			});
		}
		if (initialLocation) {
			setSelectedLocation({
				lat: initialLocation.lat,
				lon: initialLocation.lon,
			});
		} else {
			getLocation();
		}
	}, [initialLocation]);

	const region = {
		latitude: initialLocation ? initialLocation.lat : 37.78,
		longitude: initialLocation ? initialLocation.lon : -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	const selectLocationHandler = (event) => {
		if (initialLocation) {
			return;
		}
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
		if (initialLocation) return;
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
	}, [props.navigation, selectedLocation, initialLocation]);

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
