import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

const CText = (props) => {
	const themeData = useContext(ThemeContext);
	let styles = {
		fontFamily: "quicksand",
		color: themeData.AppTheme.colors.text,
	};
	return <Text style={[styles, props.style]}>{props.children}</Text>;
};

export default CText;
