import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
import CText from "../ui/CText";
import { ThemeContext } from "../../context/ThemeContext";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = () => {
	const [enteredTitle, setEnteredTitle] = useState("");
	const changeTitleHandler = (text) => {
		setEnteredTitle(text);
	};
	const themeData = useContext(ThemeContext);

	return (
		<ScrollView>
			<View>
				<CText className="text-xl p-4">Place Name</CText>
				<TextInput
					value={enteredTitle}
					onChangeText={changeTitleHandler}
					className="border-2 mx-4 mb-4 p-1 rounded-lg"
					style={{
						borderColor: themeData.AppTheme.colors.secondary,
					}}
					cursorColor={themeData.AppTheme.colors.primary}
				/>
			</View>
			<ImagePicker />
			<LocationPicker />
		</ScrollView>
	);
};

const styles = StyleSheet.create({});

export default PlaceForm;
