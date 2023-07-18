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

const AllPlaces = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const themeData = useContext(ThemeContext);
	const isFocused = useIsFocused();
	const [loadedPlaces, setLoadedPlaces] = useState([]);

	useEffect(() => {
		if (isFocused && route.params) {
			console.log("AllPlaces useEffect", route.params);
			setLoadedPlaces((prevPlaces) => [
				...prevPlaces,
				route.params.place,
			]);
		}
	}, [route, isFocused]);
	return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
