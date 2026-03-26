import Slider from "@react-native-community/slider";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

const BeforeAfter = ({ before, after }: any) => {
    const [value, setValue] = useState(0.5);

    return (
        <View style={{ marginVertical: 20, alignItems: "center" }}>
            <View
                style={{ width: 250, height: 250 }}
                pointerEvents="none"
            >
                <Image source={{ uri: before }} style={styles.image} />

                <View
                    style={[
                        styles.overlay,
                        { width: 250 * value },
                    ]}
                >
                    <Image source={{ uri: after }} style={styles.image} />
                </View>
            </View>

            <View style={{ width: 250 }}>
                <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={0}
                    maximumValue={1}
                    value={value}
                    onValueChange={setValue}
                />
            </View>
        </View>
    );
};

export default BeforeAfter;

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 250,
        position: "absolute",
    },
    overlay: {
        overflow: "hidden",
        position: "absolute",
        left: 0,
        top: 0,
        height: 250,
    },
});