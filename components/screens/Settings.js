import React, { useEffect } from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import CText from "../ui/CText";
import { useColorScheme } from "react-native";

const Settings = () => {
	const { AppTheme, toggleTheme } = useContext(ThemeContext);
	const theme = useTheme();
	const scheme = useColorScheme();
	console.log("theme", theme);
	useEffect(() => {
		toggleTheme();
		console.log("settings, scheme", scheme);
	}, [scheme]);

	const toggleSwitch = () => {
		toggleTheme();
		console.log("Changed Theme", AppTheme);
	};
	return (
		<View
			className="flex flex-row justify-between p-4 px-6 rounded-full shadow-md shadow-slate-800 m-4 align-middle items-center"
			style={{
				backgroundColor: AppTheme.colors.card,
				borderColor: AppTheme.colors.border,
			}}
		>
			<CText
				className="text-xl"
				style={{
					color: AppTheme.colors.text,
				}}
			>
				Change Theme
			</CText>
			<Switch
				trackColor={{ false: "#767577", true: "#81b0ff" }}
				thumbColor={AppTheme.dark ? "#f5dd4b" : "#f4f3f4"}
				ios_backgroundColor="#3e3e3e"
				onValueChange={toggleSwitch}
				value={AppTheme.dark}
				className=""
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Settings;
