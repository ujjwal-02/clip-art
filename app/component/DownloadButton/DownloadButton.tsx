import * as FileSystem from "expo-file-system/legacy";
import { Button } from "react-native";

const DownloadButton = ({ url }: any) => {
  const handleDownload = async () => {
    try {
      const fileUri =
        FileSystem.documentDirectory +
        `image_${Date.now()}.png`;

      await FileSystem.downloadAsync(url, fileUri);

      alert("Image downloaded!");
    } catch (err) {
      console.log("DOWNLOAD ERROR 👉", err);
    }
  };

  return <Button title="Download" onPress={handleDownload} />;
};

export default DownloadButton;