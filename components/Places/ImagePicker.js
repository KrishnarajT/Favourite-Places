import React, { useState, useContext } from "react";
import { View, Image } from "react-native";
import { launchCameraAsync } from "expo-image-picker";
import CText from "../ui/CText";
import { useCameraPermissions } from "expo-image-picker";
import PrimaryButton from "../ui/PrimaryButton";
import { ThemeContext } from "../../context/ThemeContext";

const ImagePicker = ({ onImageTaken }) => {
	const [cameraPermissionInformation, requestPermission] =
		useCameraPermissions();
	const themeData = useContext(ThemeContext);

	const [pickedImage, setPickedImage] = useState();

	const veryfyPermissions = async () => {
		let result;
		if (cameraPermissionInformation.status !== "granted") {
			result = await requestPermission();
		} else if (cameraPermissionInformation.status === "granted") {
			result = cameraPermissionInformation;
		} else if (cameraPermissionInformation.status === "undetermined") {
			result = await requestPermission();
		} else {
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
		setPickedImage(image.uri);
		onImageTaken(image.uri);
	};

	let imagePreview = (
		<CText className="self-center text-center text-lg">
			No image picked yet!
		</CText>
	);
	if (pickedImage) {
		imagePreview = (
			<Image
				source={{ uri: pickedImage }}
				style={{ width: "100%", height: "100%" }}
			/>
		);
	}

	return (
		<View className="flex-1 flex justify-center items-center text-center p-4">
			<CText className="text-xl mb-4">Image Preview</CText>
			<View
				className="w-full h-52 rounded-2xl mx-4 justify-center mb-8"
				style={{
					backgroundColor: themeData.AppTheme.colors.primary,
					overflow: "hidden",
				}}
			>
				{imagePreview}
			</View>
			<PrimaryButton
				title="Take Image"
				onPress={takeImageHandler}
				iconName="camera"
			>
				Take Image
			</PrimaryButton>
		</View>
	);
};

export default ImagePicker;
