import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import CText from "../ui/CText";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const PlaceItem = ({ place, onSelect }) => {
	const themedata = useContext(ThemeContext);

	return (
		<Pressable
			onPress={() => onSelect(place.item.id)}
			className="rounded-lg m-4 pb-4 items-center justify-center align-middle shadow-lg"
			android_ripple={themedata.AppTheme.colors.primary}
			style={{
				backgroundColor: themedata.AppTheme.colors.card,
				shadowColor: themedata.AppTheme.colors.text,
			}}
		>
			<View className="m-4 w-full h-52 flex-col items-center">
				<Image
					source={{ uri: place.item.imageURI }}
					className="rounded-lg h-40 w-11/12 mb-3"
				/>
				<CText
					className="text-lg text-center font-bold"
					style={{
						color: themedata.AppTheme.colors.primary
					}}
				>
					{place.item.title}
				</CText>
				<CText className="text-md text-center ">
					{place.item.location.address}
				</CText>
			</View>
		</Pressable>
	);
};

export default PlaceItem;

const styles = StyleSheet.create({});
