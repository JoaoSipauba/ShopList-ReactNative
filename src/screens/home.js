import "react-native-gesture-handler";
import * as React from "react";

import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Categoria from "../components/categoria";
import { useDispatch } from "react-redux";

let ScreenHeight = Dimensions.get("window").height / 100;
let ScreenWidth = Dimensions.get("window").width / 100;

function HomeScreen({ navigation }) {
  const [categorias, setCategorias] = React.useState([]);

  React.useEffect(() => {
    const loadCategoria = navigation.addListener("focus", () => {
      function getCategorias() {
        AsyncStorage.getItem("Categorias").then((data) => {
          setCategorias(JSON.parse(data));
        });
      }
      getCategorias();
    });
    return loadCategoria;
  }, [navigation]);
  let colors = ["#F9931F", "#FEB400", "#4CBE42", "#567DF4", "#F45052"];
  function randColor() {
    var color = colors[(Math.random() * colors.length) | 0];
    return color;
  }
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.text}>Categorias</Text>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {categorias ? (
            categorias.map((categoria, index) => (
              <Categoria
                data={categoria}
                color={randColor()}
                nome={categoria.categoria}
                navigation={navigation}
                index={index}
              />
            ))
          ) : (
            <Text style={styles.null}>Cadastre uma nova categoria</Text>
          )}
        </View>
      </ScrollView>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => navigation.navigate("AddCategoria")}
      >
        <View style={styles.btnCriar}>
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>
            Criar Lista
          </Text>
        </View>
      </TouchableHighlight>
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
  btnCriar: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    height: ScreenHeight * 6,
    width: ScreenWidth * 94,
    borderRadius: 29,
  },
  null: {
    // margin: 0,
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
  },
});
export default HomeScreen;
