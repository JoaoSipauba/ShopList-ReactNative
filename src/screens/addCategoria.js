import "react-native-gesture-handler";
import * as React from "react";

import { AsyncStorage, StyleSheet, View, TextInput } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

function AddCategoria({ navigation }) {
  const [inputSection, setInputSection] = React.useState("");

  async function addSection() {
    if (inputSection === "Excluir") {
      AsyncStorage.removeItem("Categorias").then(() => {
        setInputSection("");
        navigation.navigate("Home");
      });
    } else {
      if (inputSection !== "") {
        let categorias = [];
        let data = { categoria: inputSection.trim(), cor:"" };

        const myArray = await AsyncStorage.getItem("Categorias");
        if (myArray === null) {
          categorias.push(data);
          AsyncStorage.setItem(
            "Categorias",
            JSON.stringify(categorias),
            () => {}
          )
            .then(() => {
              setInputSection("");
              navigation.navigate("Home");
            })
            .catch(() => {
              alert("Something goes wrong.");
            });
        } else {
          // AsyncStorage.removeItem('Categorias')
          var newCategorias = JSON.parse(myArray);
          newCategorias.push(data);
          AsyncStorage.setItem(
            "Categorias",
            JSON.stringify(newCategorias),
            () => {}
          )
            .then(() => {
              setInputSection("");
              navigation.navigate("Home");
            })
            .catch(() => {
              alert("Something goes wrong.");
            });
        }
      }
    }
  }
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui"
            onChangeText={(e) => setInputSection(e)}
            value={inputSection}
          />
          <Button
            type="clear"
            icon={<Icon name="plus-square" size={35} color="white" />}
            style={{ marginVertical: 0 }}
            onPress={addSection}
          />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  viewInput: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    backgroundColor: "rgb(48,146,253)",
    paddingRight: 22,
    marginHorizontal: 20,
    borderRadius: 30,
  },
  input: {
    backgroundColor: "transparent",
    padding: 8,
    marginLeft: 8,
    paddingLeft: 20,
    color: "#000",
    flex: 1,
  },
});

export default AddCategoria;
