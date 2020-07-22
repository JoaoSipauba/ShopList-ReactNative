import "react-native-gesture-handler";
import * as React from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import { Dimensions } from "react-native";
import { useDispatch } from "react-redux";

let ScreenHeight = Dimensions.get("window").height / 100;
let ScreenWidth = Dimensions.get("window").width / 100;

function Categoria(props) {
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => {
            dispatch({ type: "ADD_CATEGORIA", data: props.data });
            props.navigation.navigate("Lista");
          }}
        >
          <View
            style={{
              backgroundColor: props.color,
              height: ScreenHeight * 19.5,
              width: ScreenWidth * 40,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.text}>{props.nome}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: "2%",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 21,
  },
});
export default Categoria;
