import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useTheme, useNavigation, useRoute } from "@react-navigation/native";

const Screen1 = (props) => {
  const route = useRoute();
  const data = route.params !== undefined ? route.params.some_data : "no data";
  const navigation = useNavigation();
  const scheme = useTheme().dark ? "dark" : "light";
  const colors = useTheme().colors;

  return (
    <View>
      <CText
        style={{
          fontFamily: "quicksand",
          color: colors.text,
          // fontSize: 35,
          // fontWeight: "100",
        }}
        className="text-4xl"
      >
        Screen 1 - {scheme}
      </CText>
      <Button
        title="Go to Screen 2"
        onPress={() =>
          navigation.navigate("Screen2", {
            some_data: "some data from screen 1",
          })
        }
      />
      <CText>{data}</CText>
    </View>
  );
};

export default Screen1;
