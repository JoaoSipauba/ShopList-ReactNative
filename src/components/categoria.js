import "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { Dimensions } from "react-native";

let ScreenHeight = (Dimensions.get("window").height)/100;
let ScreenWidth = (Dimensions.get("window").width)/100;

function Categoria({ navigation }) {
  const color = ["#F9931F", "#FEB400", "#4CBE42", "#567DF4", "#F45052"];
  return (
    <>
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.navigate("Lista")}
        >
          <View style={styles.card}></View>
        </TouchableHighlight>
        <Text style={styles.text}>Mercado</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: "2%",
  },
  card: {
    backgroundColor: "#F9931F",
    height: ScreenHeight*19.5,
    width: ScreenWidth*40,
    borderRadius: 10,
  },
  text: {
    color: "#3092FD",
    fontWeight: "bold",
  },
});
export default Categoria;
