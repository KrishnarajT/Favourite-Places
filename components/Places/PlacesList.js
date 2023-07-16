import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import PlaceItem from "./PlaceItem";
import CText from "../ui/CText";

const PlacesList = ({ places }) => {
	if (places.length === 0) {
		return (
			<View>
				<CText className="text-xl text-center p-4">
					No places found. Maybe add one?
				</CText>
			</View>
		);
	}

	return (
		<FlatList
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => <PlaceItem place={itemData} />}
		/>
	);
};

export default PlacesList;
