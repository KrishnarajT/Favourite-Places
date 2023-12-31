import React, { useState, useContext, useCallback, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
import CText from "../ui/CText";
import { ThemeContext } from "../../context/ThemeContext";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import PrimaryButton from "../ui/PrimaryButton";
import { Alert } from "react-native";
import Place from "../../models/Place";

const PlaceForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState(null);
  const [pickedImage, setPickedImage] = useState("");
  const [fresh, setFresh] = useState(true);

  const changeTitleHandler = (text) => {
    setEnteredTitle(text);
  };
  const themeData = useContext(ThemeContext);

  function savePlaceHandler() {
    if (!enteredTitle || !pickedImage || !pickedLocation) {
      Alert.alert("Insufficient Data", "Please fill all the fields", [
        { text: "Okay" },
      ]);
      return;
    }
    const place = new Place(enteredTitle, pickedImage, pickedLocation);
    onCreatePlace(place);
    setEnteredTitle("");
    setPickedImage("");
    setPickedLocation(null);
    setFresh(false);
  }
  function imageTakenHandler(imagePath) {
    setPickedImage(imagePath);
  }
  const locationPickedHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

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
            color: themeData.AppTheme.colors.text,
          }}
          cursorColor={themeData.AppTheme.colors.primary}
          selectionColor={themeData.AppTheme.colors.text}
        />
      </View>
      <ImagePicker onImageTaken={imageTakenHandler} fresh={fresh} />
      <LocationPicker onLocationPicked={locationPickedHandler} />
      <View className="p-4">
        <PrimaryButton
          iconName="checkmark"
          className="m-2"
          onPress={savePlaceHandler}
        >
          Save
        </PrimaryButton>
      </View>
    </ScrollView>
  );
};

export default PlaceForm;
