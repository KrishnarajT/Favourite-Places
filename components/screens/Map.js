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
import { useIsFocused } from "@react-navigation/native";

const Map = (props) => {
	const isfocused = useIsFocused();
	const initialLocation = props.route.params
		? props.route.params.initialLocation
		: null;
	const [selectedLocation, setSelectedLocation] = useState(
		initialLocation ? initialLocation : null
	);

	useLayoutEffect(() => {
		async function getLocation() {
			const location = await getCurrentPositionAsync({
				accuracy: 6,
			});
			setSelectedLocation({
				lat: location.coords.latitude,
				lon: location.coords.longitude,
			});
		}
		getLocation();
	}, [isfocused]);

	useLayoutEffect(() => {
		if (!props.route.params) {
			props.navigation.setOptions({
				headerRight: null,
			});
			return;
		}
		if (props.route.params.readonly) {
			props.navigation.setOptions({
				headerRight: null,
			});
			return;
		}
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

	const savePickLocationHandler = useCallback(() => {
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
	if (!selectedLocation) {
		return (
			<View>
				<CText className="text-center text-xl">
					No location selected yet.
				</CText>
			</View>
		);
	}
	const region = {
		latitude: initialLocation ? initialLocation.lat : selectedLocation.lat,
		longitude: initialLocation ? initialLocation.lon : selectedLocation.lon,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	const selectLocationHandler = (event) => {
		if (initialLocation) {
			return;
		}
		const lat = event.nativeEvent.coordinate.latitude;
		const lon = event.nativeEvent.coordinate.longitude;
		setSelectedLocation({
			lat: lat,
			lon: lon,
		});
	};

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
