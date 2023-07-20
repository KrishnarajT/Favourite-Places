import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import CText from "../ui/CText";
import PrimaryButton from "../ui/PrimaryButton";
import { fetchPlaceDetails } from "../../utilities/database";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const PlaceDetails = (props) => {
	const placeId = props.route.params.placeId;
	console.log("you are now in place detail realm", placeId);
	const focused = useIsFocused();
	const navigation = useNavigation();
	const [selectedPlace, setSelectedPlace] = useState(null);

	props.navigation.setOptions({
		title: "Loading Details",
	});
	useEffect(() => {
		const loadPlaceDetails = async () => {
			fetchPlaceDetails(placeId)
				.then((place) => {
					setSelectedPlace(place);
					props.navigation.setOptions({
						title: place.title,
					});
					console.log("place details", place);
				})
				.catch((err) => {
					console.log("error in fetching place details", err);
				});
		};
		loadPlaceDetails();
	}, [placeId, focused]);

	function showMapHandler() {
		console.log("showMapHandler");
		navigation.navigate("Map", {
			readonly: true,
			initialLocation: selectedPlace.location,
		});
	}

	if (!selectedPlace) {
		return (
			<View className="flex-1">
				<CText>No place found</CText>
			</View>
		);
	}

	return (
		<View className="flex-1 items-center w-full">
			<View>
				<CText className="text-2xl p-4">Image</CText>
			</View>
			<Image
				source={{ uri: selectedPlace.imageURI }}
				className="rounded-lg h-40 w-11/12 mb-3"
			/>
			<View>
				<CText className="text-2xl p-4">Address</CText>
			</View>
			<View>
				<CText className="text-xl pb-4 text-center">
					{selectedPlace.location.address}
				</CText>
			</View>
			<PrimaryButton title="Show on Map" onPress={showMapHandler}>
				Show on Map
			</PrimaryButton>
		</View>
	);
};

export default PlaceDetails;
