import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import PlaceItem from "./PlaceItem";
import CText from "../ui/CText";
import { useNavigation } from "@react-navigation/native";



const PlacesList = ({ places }) => {
	const navigation = useNavigation();

	if (places.length === 0) {
		console.log("No places found");
		return (
			<View>
				<CText className="text-xl text-center p-4">
					No places found. Maybe add one?
				</CText>
			</View>
		);
	}

	const onSelectHandler = (id) => {
		console.log("onSelect", id);
		// go to the place detail screen
		navigation.navigate("PlaceDetails", { placeId: id });
	};

	return (
		<FlatList
			data={places}
			keyExtractor={(item) => item.id}
			style={{ width: "100%", flex: 1 }}
			renderItem={(itemData) => (
				<PlaceItem place={itemData} onSelect={onSelectHandler} />
			)}
		/>
	);
};

export default PlacesList;
