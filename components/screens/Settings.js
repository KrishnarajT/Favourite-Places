import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import CText from "../ui/CText";
import SelectCountryScreen from "../ui/DropDown";

const Settings = () => {
  const { AppTheme, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  console.log("theme from settings", theme);

  const onDropDownChange = (mode) => {
    console.log("mode", mode);
    toggleTheme(mode);
  };

  return (
    <View
      className="flex flex-row justify-between px-2 rounded-full shadow-md shadow-slate-800 m-4 align-middle items-center"
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
      <SelectCountryScreen onChange={onDropDownChange} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Settings;
