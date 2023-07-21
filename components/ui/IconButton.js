import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ onPress, iconName, size, color, style }) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={iconName} size={size} color={color} style={style} />
    </Pressable>
  );
};

export default IconButton;
