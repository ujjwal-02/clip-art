import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Button } from "react-native";

const ShareButton = ({ url }: any) => {
    const handleShare = async () => {
        try {
            const fileUri = FileSystem.documentDirectory + "image.png";

            const { uri } = await FileSystem.downloadAsync(url, fileUri);

            await Sharing.shareAsync(uri);
        } catch (err) {
            console.log("SHARE ERROR 👉", err);
        }
    };

    return <Button title="Share" onPress={handleShare} />;
};

export default ShareButton;