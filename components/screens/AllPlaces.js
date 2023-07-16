import React from "react";
import { View, StyleSheet } from "react-native";
import PlacesList from "../Places/PlacesList";
import CText from "../ui/CText";

const AllPlaces = () => {
	let places = [];
	return <PlacesList places={places} />;
};

export default AllPlaces;
