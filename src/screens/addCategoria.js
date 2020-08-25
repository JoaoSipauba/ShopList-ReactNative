import "react-native-gesture-handler";
import * as React from "react";

import {
  AsyncStorage,
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

let ScreenHeight = Dimensions.get("window").height / 100;
let ScreenWidth = Dimensions.get("window").width / 100;

function AddCategoria({ navigation }) {
  const [inputSection, setInputSection] = React.useState("");
  const [background, setBackground] = React.useState("#4CBE42");
  const [selecionado, setSelecionado] = React.useState(2);

  async function addSection() {
    if (inputSection === "Excluir") {
      AsyncStorage.removeItem("Categorias").then(() => {
        setInputSection("");
        navigation.navigate("Home");
      });
    } else {
      if (inputSection !== "") {
        let categorias = [];
        let data = {
          categoria: inputSection.trim(),
          cor: background,
          lista: [],
        };

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
  const cores = ["#F45052", "#FEB400", "#4CBE42", "#F9931F", "#567DF4"];

  return (
      <ScrollView>
        <View
          style={{
            paddingTop: "25%",
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "flex-start",
              marginLeft: ScreenWidth * 3,
              fontSize: 27,
              color: "black",
              padding: "5%",
              fontWeight: "bold",
            }}
          >
            Cor:
          </Text>
          <View style={{ flexDirection: "row", marginTop: 0 }}>
            {cores.map((cor, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => {
                  setBackground(cor);
                  setSelecionado(index);
                }}
              >
                <View
                  style={{
                    backgroundColor: cor,
                    height: ScreenHeight * 8,
                    width: ScreenWidth * 16,
                    borderRadius: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: ScreenHeight * 4,
                    marginHorizontal: 2,
                  }}
                >
                  {selecionado === index ? (
                    <Icon name="check" size={35} color="white" />
                  ) : (
                    <Text></Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text
            style={{
              alignSelf: "flex-start",
              marginLeft: ScreenWidth * 3,
              fontSize: 27,
              color: "black",
              padding: "5%",
              fontWeight: "bold",
            }}
          >
            Nome da lista:
          </Text>
          <View style={styles.viewInput}>
            <TextInput
              style={styles.input}
              placeholder="Digite aqui"
              placeholderTextColor="white"
              onChangeText={(e) => setInputSection(e)}
              value={inputSection}
              maxLength={20}
              autoFocus={true}
            />
            <Button
              type="clear"
              icon={<Icon name="plus-square" size={35} color="white" />}
              style={{ marginVertical: 0 }}
              onPress={addSection}
            />
          </View>
        </View>
      </ScrollView>
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
    color: "white",
    flex: 1,
  },
});

export default AddCategoria;
