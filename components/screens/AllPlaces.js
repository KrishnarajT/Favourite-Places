import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import PlacesList from "../Places/PlacesList";
import CText from "../ui/CText";
import { ThemeContext } from "../../context/ThemeContext";
import {
	useIsFocused,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { fetchPlaces } from "../../utilities/database";

const AllPlaces = () => {
	const navigation = useNavigation();
	const themeData = useContext(ThemeContext);
	const isFocused = useIsFocused();
	const [loadedPlaces, setLoadedPlaces] = useState([]);

	useEffect(() => {
		async function loadPlaces() {
			const places = await fetchPlaces();
			setLoadedPlaces(places);
		}
		if (isFocused) {
			loadPlaces();
			console.log("AllPlaces useEffect");
		}
	}, [isFocused]);
	return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
