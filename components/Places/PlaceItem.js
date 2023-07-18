import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import CText from "../ui/CText";

const PlaceItem = ({ place, onSelect }) => {
	console.log("wha th hell is this", place)
	return (
		<Pressable onPress={onSelect} className="bg-slate-600">
			<Image source={{ uri: place.item.imageURI }} style={{ width: "100%", height: "100%" }} />
			<View>
				<CText>{place.item.title}</CText>
				<CText>{place.item.location.address}</CText>
			</View>
		</Pressable>
	);
};

export default PlaceItem;

const styles = StyleSheet.create({});
