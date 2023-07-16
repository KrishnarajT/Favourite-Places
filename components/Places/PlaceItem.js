import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import CText from "../ui/CText";

const PlaceItem = ({ place, onSelect }) => {
	return (
		<Pressable onPress={onSelect}>
			<Image source={{ uri: place.ImageURI }} />
			<View>
				<CText>{place.title}</CText>
				<CText>{place.address}</CText>
			</View>
		</Pressable>
	);
};

export default PlaceItem;

const styles = StyleSheet.create({});
