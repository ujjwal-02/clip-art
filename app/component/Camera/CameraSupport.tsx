import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native";

const CameraSupport = (props : any) => {
    const openCamera = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            alert("Camera permission required!");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            quality: 0.5,
        });

        if (!result.canceled) {
            props.setImage(result.assets[0].uri);
        }
    };


    return (<Button title="Open Camera" onPress={openCamera} />)
}
export default CameraSupport;