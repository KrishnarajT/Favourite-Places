import React from "react";
import { Text } from "react-native";

const CText = (props) => {
	console.log(props);
	let styles = {
		fontFamily: "quicksand",
	};

	return <Text style={[styles, props.style]}>{props.children}</Text>;
};

export default CText;
