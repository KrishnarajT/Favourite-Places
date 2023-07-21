import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

const local_data = [
	{
		value: "1",
		lable: "Light",
		image: {
			uri: "https://img.icons8.com/external-flat-papa-vector/78/external-Light-Mode-interface-flat-papa-vector.png",
		},
	},
	{
		value: "2",
		lable: "Dark",
		image: {
			uri: "https://img.icons8.com/external-creatype-flat-colourcreatype/64/external-dark-basic-creatype-flat-colourcreatype.png",
		},
	},
	{
		value: "3",
		lable: "System",
		image: {
			uri: "https://img.icons8.com/external-parzival-1997-outline-color-parzival-1997/64/external-system-human-networking-parzival-1997-outline-color-parzival-1997.png",
		},
	},
];

const SelectCountryScreen = (_props) => {
	const [country, setCountry] = useState("1");

	return (
		<SelectCountry
			style={styles.dropdown}
			selectedTextStyle={styles.selectedTextStyle}
			placeholderStyle={styles.placeholderStyle}
			imageStyle={styles.imageStyle}
			iconStyle={styles.iconStyle}
			maxHeight={200}
			value={country}
			data={local_data}
			valueField="value"
			labelField="lable"
			imageField="image"
			placeholder="Select country"
			searchPlaceholder="Search..."
			onChange={(e) => {
				setCountry(e.value);
				const mode = local_data[parseInt(e.value) - 1].lable;
				_props.onChange(mode);
			}}
		/>
	);
};

export default SelectCountryScreen;

const styles = StyleSheet.create({
	dropdown: {
		margin: 16,
		height: 50,
		width: 150,
		backgroundColor: "#EEEEEE",
		borderRadius: 22,
		paddingHorizontal: 8,
	},
	imageStyle: {
		width: 24,
		height: 24,
		borderRadius: 12,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
		marginLeft: 8,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
});
