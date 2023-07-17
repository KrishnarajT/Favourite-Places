// import react stuff

import {
	StyleSheet,
	Text,
	View,
	useColorScheme,
	Pressable,
} from "react-native";
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
import Map from "./components/screens/Map";

// import utilities
import MyLightTheme from "./utilities/LightTheme";
import MyDarkTheme from "./utilities/DarkTheme";
import { Ionicons } from "@expo/vector-icons";

// import contexts
import { ThemeContext } from "./context/ThemeContext";
import { getDarkMode, toggleDarkMode } from "./utilities/Http";
import AllPlaces from "./components/screens/AllPlaces";
import AddPlace from "./components/screens/AddPlace";
import IconButton from "./components/ui/IconButton";

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
			<NavigationContainer theme={themedata.AppTheme}>
				<StatusBar style={themedata.AppTheme.dark ? "light" : "dark"} />
				<Stack.Navigator
					screenOptions={{
						headerStyle: {
							backgroundColor: themedata.AppTheme.colors.card,
						},
						headerTintColor: themedata.AppTheme.colors.text,
						contentStyle: {
							backgroundColor:
								themedata.AppTheme.colors.background,
						},
						headerTitleStyle: {
							fontFamily: "quicksand",
						},
						headerTitleAlign: "center",
					}}
				>
					<Stack.Screen
						name="Places"
						component={AllPlaces}
						options={({ navigation }) => ({
							headerRight: () => (
								<IconButton
									iconName="ios-add"
									size={30}
									color={themedata.AppTheme.colors.primary}
									style={{ marginRight: 10 }}
									onPress={() =>
										navigation.navigate("AddPlace")
									}
								/>
							),
							// these are dependent on the kind of navigation you are using. check doc.
							title: "All Places",
							tabBarIcon: ({ color, size }) => {
								return (
									<Ionicons
										name="map"
										size={size}
										color={color}
									/>
								);
							},
							headerTitle: "Your Favourite Places",
						})}
					/>

					<Stack.Screen
						name="AddPlace"
						component={AddPlace}
						options={{
							// these are dependent on the kind of navigation you are using. check doc.
							title: "Add Place",
							tabBarIcon: ({ color, size }) => {
								return (
									<Ionicons
										name="navigate"
										size={size}
										color={color}
									/>
								);
							},
							headerTitle: "Add a New Place",
						}}
					/>

					<Stack.Screen
						name="Settings"
						component={Settings}
						options={{
							// these are dependent on the kind of navigation you are using. check doc.
							title: "Settings",
							tabBarIcon: ({ color, size }) => {
								return (
									<Ionicons
										name="settings"
										size={size}
										color={color}
									/>
								);
							},
						}}
					/>
					<Stack.Screen
						name="Map"
						component={Map}
						options={{
							// these are dependent on the kind of navigation you are using. check doc.
							title: "Map",
							tabBarIcon: ({ color, size }) => {
								return (
									<Ionicons
										name="map"
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
