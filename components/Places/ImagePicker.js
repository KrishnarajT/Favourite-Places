import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { launchCameraAsync } from "expo-image-picker";
import CText from "../ui/CText";
import { useCameraPermissions } from "expo-image-picker";

const ImagePicker = () => {

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    const veryfyPermissions = async () => {
        const result = await requestPermission();
        if (result.status !== "granted") {
            Alert.alert(
                "Insufficient Permissions",
                "You need to grant camera permissions to use this app",
                [{ text: "Okay" }]
            );
            return false;
        }
        return true;
    };
    
    const takeImageHandler = async () => {
        const hasPermission = await veryfyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        console.log(image);
	};
	return (
		<View>
			<View>
				<CText>Image Preview</CText>
			</View>
			<Button title="Take Image" onPress={takeImageHandler} />
		</View>
	);
};


export default ImagePicker;
