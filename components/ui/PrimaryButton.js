import { View, Pressable, StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const PrimaryButton = (props) => {
  const pressHandler = () => {
    props.onPress();
  };
  const themeData = useContext(ThemeContext);
  const styles = StyleSheet.create({
    normal: {
      color: themeData.AppTheme.colors.text,
      backgroundColor: themeData.AppTheme.colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    pressed: {
      opacity: 0.75,
    },
  });
  return (
    <View className="rounded-full m-1 text-white text-center overflow-hidden shadow-lg">
      <Pressable
        onPress={pressHandler}
        style={({ pressed }) => {
          if (pressed) {
            return [styles.pressed, styles.normal];
          }
          return styles.normal;
        }}
        android_ripple={{
          color: "rgba(21, 128, 61, 0.2)",
        }}
      >
        <Ionicons
          name={props.iconName}
          size={24}
          color="white"
          style={{ marginRight: 8 }}
        />
        <Text
          className="text-white text-center text-xl"
          style={{ fontFamily: "quicksand" }}
        >
          {props.children}
        </Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;
