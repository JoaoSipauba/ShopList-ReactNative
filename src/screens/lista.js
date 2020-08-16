import "react-native-gesture-handler";
import * as React from "react";
import { useSelector } from "react-redux";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  AsyncStorage,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import Item from "../components/item";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

let ScreenHeight = Dimensions.get("window").height / 100;
let ScreenWidth = Dimensions.get("window").width / 100;

function Lista({ navigation }) {
  const data = useSelector((state) => state.categoria);

  const [itens, setItens] = React.useState(data.lista);
  const [mostrar, setMostrar] = React.useState(true);
  const [inputItem, setInputItem] = React.useState("");

  React.useEffect(() => {
    setItens(data.lista);
  }, [data]);

  async function addItem() {
    if (inputItem !== "") {
      var newItens = itens;
      let newItem = { item: inputItem, checked: false, quantidade: 1, descrição:"" };
      newItens.push(newItem);
      setItens(newItens);
      let categorias = [];

      await AsyncStorage.getItem("Categorias").then((array) => {
        categorias = JSON.parse(array);
      });

      categorias[data.index].lista = itens;
      await AsyncStorage.setItem("Categorias", JSON.stringify(categorias)).then(
        () => {
          setInputItem("");
        }
      );
    }
  }
  async function removeItem() {
    let array = itens;
    let newarray = [];

    await array.map((item, index) => {
      if (item.checked === false) {
        newarray.push(item);
      } else {
        item.checked = false;
      }
    });
    setItens(newarray);
    data.lista = newarray;

    setMostrar(false);
    setMostrar(true);
    let categorias = [];

    await AsyncStorage.getItem("Categorias").then((array) => {
      categorias = JSON.parse(array);
    });

    categorias[data.index].lista = newarray;
    await AsyncStorage.setItem("Categorias", JSON.stringify(categorias));
  }
  if (mostrar) {
    return (
      <>
        <ScrollView>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {data ? (
              <Text style={styles.text}>{data.categoria}</Text>
            ) : (
              <Text></Text>
            )}
          </View>
          {itens.length > 0?(
            itens.map((item, index) => (
              <Item
                key={index}
                index={index}
                checked={item.checked}
                texto={`${item.item}`}
                quantidade={item.quantidade}
                navigation={navigation}
                item={item}
              />
              ))): <Text style={styles.null}>Sua lista está vazia...</Text>}
        </ScrollView>
        <View
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            alignItems: "center",
            backgroundColor: "rgb(48,146,253)",
            borderRadius: 40,
            bottom: ScreenHeight * 8,
            right: ScreenWidth * 0.1,
            padding: 10,
            height: ScreenHeight * 7.5,
            width: ScreenWidth * 14.3,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,

            elevation: 3,
          }}
        >
          <TouchableOpacity activeOpacity={0.9} onPress={() => removeItem()}>
            <Icon name="trash-o" size={35} color="white" style={{}} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui"
            placeholderTextColor="white"
            onChangeText={(e) => setInputItem(e)}
            value={inputItem}
            maxLength={18}
          />
          <Button
            type="clear"
            icon={<Icon name="plus-square" size={35} color="white" />}
            style={{ marginVertical: 0 }}
            onPress={addItem}
          />
        </View>
      </>
    );
  } else {
    return <View />;
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 23,
    color: "#2196F3",
    marginTop: 20,
    fontWeight: "bold",
    marginBottom: 25,
  },
  null: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
    alignSelf: "center"
  },
  viewInput: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    backgroundColor: "rgb(48,146,253)",
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

export default Lista;
