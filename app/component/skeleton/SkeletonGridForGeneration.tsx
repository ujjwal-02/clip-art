import { View } from "react-native";

const SkeletonGridForGeneration = () => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
      {[1, 2, 3, 4].map((_, i) => (
        <View
          key={i}
          style={{
            width: 150,
            height: 150,
            margin: 5,
            backgroundColor: "#ddd",
            borderRadius: 10,
          }}
        />
      ))}
    </View>
  );
};

export default SkeletonGridForGeneration;