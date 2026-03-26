import { useEffect, useRef } from "react";
import { Animated, Button, Image, StyleSheet, Text, View } from "react-native";
import DownloadButton from "../DownloadButton/DownloadButton";
import ShareButton from "../ShareButton/ShareButton";

const ResultCard = ({ item, onRetry }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <Text style={styles.title}>{item.name}</Text>

      <Image source={{ uri: item.url }} style={styles.image} />

      <View style={styles.actions}>
        <ShareButton url={item.url} />
        <DownloadButton url={item.url} />
        <Button title="Retry" onPress={() => onRetry(item.name)} />
      </View>

    </Animated.View>
  );
};

export default ResultCard;

const styles = StyleSheet.create({
  card: {
    width: "45%",
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    elevation: 4,
  },
  title: {
    fontWeight: "600",
    marginBottom: 6,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 10,
  },
  actions: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});