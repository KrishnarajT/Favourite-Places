import React from "react";
import { View, StyleSheet } from "react-native";
import PlaceForm from "../Places/PlaceForm";
import CText from "../ui/CText";
import { useNavigation } from "@react-navigation/native";
const AddPlace = () => {
	const navigation = useNavigation();
	function createPlaceHandler(place) {
		console.log("createPlaceHandler");
		console.log("this is the place", place);
		navigation.navigate("Places", { place: place });
	}

	return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
