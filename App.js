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
import Settings from "./components/screens/Settings.js";
import Map from "./components/screens/Map";

// import utilities
import MyLightTheme from "./utilities/LightTheme";
import MyDarkTheme from "./utilities/DarkTheme";
import { Ionicons } from "@expo/vector-icons";
import * as db from "./utilities/database";

// import contexts
import { ThemeContext } from "./context/ThemeContext";
import { getDarkMode, toggleDarkMode } from "./utilities/Http";
import AllPlaces from "./components/screens/AllPlaces";
import AddPlace from "./components/screens/AddPlace";
import IconButton from "./components/ui/IconButton";
import PlaceDetails from "./components/screens/PlaceDetails.js";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  // managing states.
  const [appIsReady, setappIsReady] = useState(false);
  const scheme = useColorScheme();
  const [AppTheme, setAppTheme] = useState(
    scheme === "dark" ? MyDarkTheme : MyLightTheme,
  );
  let theme;

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          quicksand: require("./assets/fonts/Quicksand-Regular.ttf"),
        });
        // db stuff
        db.init()
          .then(() => {
            console.log("Initialized Database");
          })
          .catch((err) => {
            console.log("Initializing db failed");
            console.log(err);
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
  const toggleTheme = (mode) => {
    if (mode === "Light") {
      setAppTheme(MyLightTheme);
      return;
    }
    if (mode === "Dark") {
      setAppTheme(MyDarkTheme);
      return;
    }
    if (mode === "System") {
      setAppTheme(scheme === "dark" ? MyDarkTheme : MyLightTheme);
      return;
    }
    // setAppTheme((AppTheme) => {
    // 	if (AppTheme.dark) {
    // 		// toggleDarkMode("suBanavu.json", false);
    // 		return MyLightTheme;
    // 	} else {
    // 		// toggleDarkMode("suBanavu.json", true);
    // 		return MyDarkTheme;
    // 	}
    // });
  };
  const themedata = {
    AppTheme: AppTheme,
    toggleTheme: toggleTheme,
  };
  // get the color scheme of the os
  const Stack = createNativeStackNavigator();

  function DisplayPlaces() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: themedata.AppTheme.colors.card,
          },
          headerTintColor: themedata.AppTheme.colors.text,
          contentStyle: {
            backgroundColor: themedata.AppTheme.colors.background,
          },
          headerTitleStyle: {
            fontFamily: "quicksand",
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                iconName="ios-add"
                size={30}
                color={themedata.AppTheme.colors.primary}
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate("AddPlace")}
              />
            ),
            // these are dependent on the kind of navigation you are using. check doc.
            title: "All Places",
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="locate" size={size} color={color} />;
            },
            headerTitle: "Your Favourite Places",
          })}
        />
        <bottomTabStack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{
            // these are dependent on the kind of navigation you are using. check doc.
            title: "Loading Details",
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="map" size={size} color={color} />;
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  const bottomTabStack = createBottomTabNavigator();
  return (
    <ThemeContext.Provider value={themedata}>
      <NavigationContainer theme={themedata.AppTheme}>
        <StatusBar style={themedata.AppTheme.dark ? "light" : "dark"} />
        <bottomTabStack.Navigator
          initialRouteName="Places"
          screenOptions={{
            headerStyle: {
              backgroundColor: themedata.AppTheme.colors.card,
            },
            headerTintColor: themedata.AppTheme.colors.text,
            contentStyle: {
              backgroundColor: themedata.AppTheme.colors.background,
            },
            headerTitleStyle: {
              fontFamily: "quicksand",
            },
            headerTitleAlign: "center",
          }}
        >
          <bottomTabStack.Screen
            name="Places"
            component={DisplayPlaces}
            options={({ navigation }) => ({
              tabBarIcon: ({ color, size }) => {
                return <Ionicons name="map" size={size} color={color} />;
              },
              headerShown: false,
            })}
          />

          <bottomTabStack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              // these are dependent on the kind of navigation you are using. check doc.
              title: "Add Place",
              tabBarIcon: ({ color, size }) => {
                return <Ionicons name="navigate" size={size} color={color} />;
              },
              headerTitle: "Add a New Place",
            }}
          />

          <bottomTabStack.Screen
            name="Map"
            component={Map}
            options={{
              // these are dependent on the kind of navigation you are using. check doc.
              title: "Map",
              tabBarIcon: ({ color, size }) => {
                return <Ionicons name="ios-locate" size={size} color={color} />;
              },
            }}
          />
          <bottomTabStack.Screen
            name="Settings"
            component={Settings}
            options={{
              // these are dependent on the kind of navigation you are using. check doc.
              title: "Settings",
              tabBarIcon: ({ color, size }) => {
                return <Ionicons name="settings" size={size} color={color} />;
              },
            }}
          />
        </bottomTabStack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
