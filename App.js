// import react stuff

import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, { useEffect, useState, createContext } from "react";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import expo stuff
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

// import components
import Screen1 from "./components/screens/Screen1";
import Screen2 from "./components/screens/Screen2";
import Settings from "./components/screens/Settings.js";

// import utilities
import MyLightTheme from "./utilities/LightTheme";
import MyDarkTheme from "./utilities/DarkTheme";
import { Ionicons } from "@expo/vector-icons";

// import contexts
import { ThemeContext } from "./context/ThemeContext";
import { getDarkMode, toggleDarkMode } from "./utilities/Http";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
	// managing states.
	const [appIsReady, setappIsReady] = useState(false);
	const scheme = useColorScheme();
	const [AppTheme, setAppTheme] = useState(
		scheme === "dark" ? MyDarkTheme : MyLightTheme
	);
	let theme;

	// Load any resources or data that we need prior to rendering the app
	useEffect(() => {
		async function prepare() {
			try {
				// Load fonts
				await Font.loadAsync({
					quicksand: require("./assets/fonts/Quicksand-Regular.ttf"),
					prozalibre: require("./assets/fonts/ProzaLibre-Regular.ttf"),
				});

				// Theme stuff

				// const darkMode = await getDarkMode("suBanavu.json");
				// console.log("darkMode", darkMode);
				// theme = darkMode ? MyDarkTheme : MyLightTheme;
				// toggleDarkMode("suBanavu.json", "true");
				// setAppTheme(theme);
				// console.log("set Theme", theme);

				// do other long running splash screen stuff here
			} catch (e) {
				console.warn(e);
			} finally {
				setappIsReady(true);
			}
		}
		prepare();
	}, []);
	if (!appIsReady) {
		return null;
	}
	// Hide splash screen
	SplashScreen.hideAsync();

	// begin code from here.
	const toggleTheme = () => {
		setAppTheme((AppTheme) => {
			if (AppTheme.dark) {
				// toggleDarkMode("suBanavu.json", false);
				return MyLightTheme;
			} else {
				// toggleDarkMode("suBanavu.json", true);
				return MyDarkTheme;
			}
		});
	};
	const themedata = {
		AppTheme: AppTheme,
		toggleTheme: toggleTheme,
	};
	// get the color scheme of the os
	// const Stack = createNativeStackNavigator();
	const Stack = createBottomTabNavigator();
	return (
		<ThemeContext.Provider value={themedata}>
			<NavigationContainer
				theme={themedata.AppTheme}
				screenOptions={{
					headerStyle: {
						backgroundColor: "#ff3",
					},
					contentStyle: {
						backgroundColor: "#000",
					},
				}}
			>
				<StatusBar style={themedata.AppTheme.dark ? "light" : "dark"} />
				<Stack.Navigator>
					<Stack.Screen
						name="Screen1"
						component={Screen1}
						options={{
							// these are dependent on the kind of navigation you are using. check doc.
							title: "Scereern 1",
							tabBarIcon: ({ color, size }) => {
								return (
									<Ionicons
										name="ios-home"
										size={size}
										color={color}
									/>
								);
							},
						}}
					/>
					<Stack.Screen
						name="Settings"
						component={Settings}
						options={{
							// these are dependent on the kind of navigation you are using. check doc.
							title: "settttings 1",
							tabBarIcon: ({ color, size }) => {
								return (
									<Ionicons
										name="ios-settings"
										size={size}
										color={color}
									/>
								);
							},
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeContext.Provider>
	);
}
