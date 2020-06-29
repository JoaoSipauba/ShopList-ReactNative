import "react-native-gesture-handler";
import * as React from "react";

import { StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Categoria from "../components/categoria";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.text}>Categorias</Text>
      <ScrollView
        // style={{}}
        >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly"}}>
          <Categoria navigation={navigation} />
          <Categoria navigation={navigation} />
          <Categoria navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: "#2196F3",
    padding: 20,
    fontWeight: "bold",
  },
});
export default HomeScreen;
