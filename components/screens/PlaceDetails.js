import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import CText from "../ui/CText";
import PrimaryButton from "../ui/PrimaryButton";
import { deletePlace, fetchPlaceDetails } from "../../utilities/database";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const PlaceDetails = (props) => {
	const placeId = props.route.params.placeId;
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
				})
				.catch((err) => {
					console.log("error in fetching place details", err);
				});
		};
		loadPlaceDetails();
	}, [placeId, focused]);

	function showMapHandler() {
		navigation.navigate("Map", {
			readonly: true,
			initialLocation: selectedPlace.location,
		});
	}

	function deleteLocationHandler() {
		// show an alert
		Alert.alert(
			"Are you sure?",
			"Do you really want to delete this place?",
			[
				{ text: "No", style: "default" },
				{
					text: "Yes",
					style: "destructive",
					onPress: () => {
						deletePlace(placeId), props.navigation.goBack();
					},
				},
			]
		);
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
			<PrimaryButton title="Show on Map" onPress={deleteLocationHandler}>
				Delete Location
			</PrimaryButton>
		</View>
	);
};

export default PlaceDetails;
