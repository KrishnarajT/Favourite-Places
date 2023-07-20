import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import CText from "../ui/CText";
import PrimaryButton from "../ui/PrimaryButton";
import { fetchPlaceDetails } from "../../utilities/database";

const PlaceDetails = (props) => {
	const placeId = props.route.params.placeId;
	const [selectedPlace, setSelectedPlace] = useState({});

	useEffect(() => {
		props.navigation.setOptions({
			title: props.route.params.placeTitle,
		});
		const loadPlaceDetails = async () => {
			selectedPlace = await fetchPlaceDetails(placeId);
			console.log("PlaceDetails", selectedPlace);
			setSelectedPlace(selectedPlace);
		};
		loadPlaceDetails();
		console.log("PlaceDetails", selectedPlace);
	}, [
		props.navigation,
		props.route.params.placeTitle,
		placeId,
		selectedPlace,
	]);

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
		<ScrollView>
			<Image source={{ uri: selectedPlace.imageURI }} />
			<View>
				<CText>{selectedPlace.location.address}</CText>
			</View>
			<PrimaryButton title="Show on Map" onPress={showMapHandler}>
				Show on Map
			</PrimaryButton>
		</ScrollView>
	);
};

export default PlaceDetails;
