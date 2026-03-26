import { StyleSheet, Text, View } from "react-native";

const ALL_STYLES = ["Cartoon", "Anime", "Flat", "Sketch"];

const StyleSelector = ({ selectedStyles, setSelectedStyles }: any) => {
  const toggleStyle = (style : any) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles((prev : any) => prev.filter((s : any) => s !== style));
    } else {
      setSelectedStyles((prev : any) => [...prev, style]);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>Select Styles</Text>

      <View style={styles.container}>
        {ALL_STYLES.map((style) => {
          const selected = selectedStyles.includes(style);

          return (
            <Text
              key={style}
              onPress={() => toggleStyle(style)}
              style={[
                styles.chip,
                selected && styles.selectedChip,
              ]}
            >
              {style}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

export default StyleSelector;

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  selectedChip: {
    backgroundColor: "#007AFF",
    color: "#fff",
  },
});