import React, { useState, useContext, useEffect } from "react";
import { View, Alert, Image } from "react-native";
import CText from "../ui/CText";
import PrimaryButton from "../ui/PrimaryButton";
import { ThemeContext } from "../../context/ThemeContext";
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from "expo-location";
import { getMapPreview } from "../../utilities/Location";
import { useRoute, useIsFocused } from "@react-navigation/native";

const LocationPicker = () => {
	const themeData = useContext(ThemeContext);
	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions();
	const [pickedLocation, setPickedLocation] = useState();
	const route = useRoute();
	const isFocused = useIsFocused();
	console.log(route.params);

	useEffect(() => {
		if (isFocused && route.params) {
			const mapPickedLocation = route.params
				? route.params.pickedLocation
				: null;
			setPickedLocation({
				lat: mapPickedLocation.lat,
				lon: mapPickedLocation.lon,
			});
		}
	}, [route, isFocused]);

	const veryfyPermissions = async () => {
		let result;
		if (locationPermissionInformation.status !== "granted") {
			result = await requestPermission();
		} else if (locationPermissionInformation.status === "granted") {
			result = locationPermissionInformation;
		} else if (locationPermissionInformation.status === "undetermined") {
			result = await requestPermission();
		} else {
			Alert.alert(
				"Insufficient Permissions",
				"You need to grant camera permissions to use this app",
				[{ text: "Okay" }]
			);
			return false;
		}
		return true;
	};

	const takeLocationHandler = async () => {
		const hasPermission = await veryfyPermissions();
		if (!hasPermission) {
			return;
		}
		const location = await getCurrentPositionAsync({
			accuracy: 6,
		});
		console.log(location);
		setPickedLocation({
			lat: location.coords.latitude,
			lon: location.coords.longitude,
		});
	};

	const pickOnMapHandler = async () => {};

	let locationPreview = (
		<CText className="self-center text-center text-lg">
			No Location picked yet!
		</CText>
	);
	if (pickedLocation) {
		locationPreview = (
			<Image
				source={{
					uri: getMapPreview({
						lat: pickedLocation.lat,
						lon: pickedLocation.lon,
					}),
				}}
				style={{ width: "100%", height: "100%" }}
			/>
		);
	}

	return (
		<View className="flex-1 flex justify-center items-center text-center p-4">
			<CText className="text-xl mb-4">Location Preview</CText>
			<View
				className="w-full h-52 rounded-2xl mx-4 justify-center mb-8"
				style={{
					backgroundColor: themeData.AppTheme.colors.primary,
					overflow: "hidden",
				}}
			>
				{locationPreview}
			</View>
			<View className="">
				<PrimaryButton
					title="Take Image"
					onPress={takeLocationHandler}
					iconName="location-sharp"
				>
					Use Current Location
				</PrimaryButton>
				<PrimaryButton
					title="Take Image"
					onPress={pickOnMapHandler}
					iconName="map"
				>
					Pick on Map
				</PrimaryButton>
			</View>
		</View>
	);
};

export default LocationPicker;
