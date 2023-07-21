import React from "react";
import { View, StyleSheet } from "react-native";
import PlaceForm from "../Places/PlaceForm";
import CText from "../ui/CText";
import { useNavigation } from "@react-navigation/native";
import { insertPlace } from "../../utilities/database";
const AddPlace = () => {
	const navigation = useNavigation();
	function createPlaceHandler(place) {
		insertPlace(place);
		navigation.navigate("Places", {
			screen: "AllPlaces",
		});
	}

	return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
