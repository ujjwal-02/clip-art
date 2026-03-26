import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import BeforeAfter from "./component/BeforeAfter/BeforeAfter";
import CameraSupport from "./component/Camera/CameraSupport";
import GenerateImages from "./component/GenerateImages/GenerateImages";
import ResultCard from "./component/ResultCard/ResultCard";
import StyleSelector from "./component/StyleSelector/StyleSelector";
import SkeletonGridForGeneration from "./component/skeleton/SkeletonGridForGeneration";

const styles = StyleSheet.create({
    view: {
        padding: 20,
        flexGrow: 1,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});

const App = () => {

    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("idle");
    const [results, setResults] = useState<any>([]);
    const [error, setError] = useState(null);

    const [selectedStyles, setSelectedStyles] = useState([
        "Cartoon",
        "Anime",
        "Flat",
        "Sketch",
    ]);



    const pickImage = async () => {

        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert("Permission required!");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });


        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const handleRetry = async (styleName: string) => {
        const updated = results.map((item: any) => {
            if (item.name === styleName) {
                return {
                    ...item,
                    url: `https://picsum.photos/seed/${styleName}_${Date.now()}/300/300`,
                };
            }
            return item;
        });

        setResults(updated);
    };

    return (
        <ScrollView contentContainerStyle={styles.view} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" nestedScrollEnabled={true}>

            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
                AI Clipart Generator
            </Text>

            <View style={{ marginBottom: 15 }}>
                <Button title="Upload Image" onPress={pickImage} />
            </View>

            <CameraSupport setImage={setImage} />

            <StyleSelector
                selectedStyles={selectedStyles}
                setSelectedStyles={setSelectedStyles}
            />

            {!image && (
                <Text style={{ marginTop: 20, color: "#666" }}>
                    Upload an image to generate AI clipart styles
                </Text>
            )}

            {image && (
                <>
                    <Image source={{ uri: image }} style={styles.image} />

                    <GenerateImages
                        image={image}
                        setLoading={setLoading}
                        setStatus={setStatus}
                        setError={setError}
                        setResults={setResults}
                        loading={loading}
                        status={status}
                        selectedStyles={selectedStyles}
                    />
                    {results.length > 0 && (
                        <BeforeAfter
                            before={image}
                            after={results[0].url}
                        />
                    )}
                </>
            )}

            {loading && <SkeletonGridForGeneration />}

            {status === "processing" && results.length === 0 && (
                <Text style={{ marginTop: 20 }}>Generating styles...</Text>
            )}

            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    marginTop: 20,
                }}
            >
                {results.map((item: any, index: number) => (
                    <ResultCard key={index} item={item} onRetry={handleRetry} />
                ))}
            </View>

            {error && (
                <Text style={{ color: "orange", marginTop: 10 }}>
                    ⚠️ API limit reached. Showing demo results.
                </Text>
            )}
            <View style={{ height: 800 }} />r
        </ScrollView>
    );

}

export default App;