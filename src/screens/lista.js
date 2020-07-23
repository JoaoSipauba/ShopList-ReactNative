import "react-native-gesture-handler";
import * as React from "react";
import { useSelector } from "react-redux";

import { StyleSheet, View, Text, TextInput, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import Item from "../components/item";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";


function Lista() {

  const [inputItem, setInputItem] = React.useState("");
  const [data, setData] = React.useState(
    useSelector((state) => state.categoria)
  );
  const [itens, setItens] = React.useState(data.lista);

  async function addItem() {
    if (inputItem !== "") {
      var newItens = itens;
      let newItem = { item: inputItem, checked: false };
      newItens.push(newItem);
      setItens(newItens);
      let categorias = []

      await AsyncStorage.getItem("Categorias").then((array)=> {
        categorias = JSON.parse(array);
      })

      categorias[data.index].lista = itens;
      await AsyncStorage.setItem("Categorias", JSON.stringify(categorias)).then(()=>{
        setInputItem("");
      })

    }
  }
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
        {itens.map((item, index) => (
          <Item key={index} index={index} checked={item.checked} texto={`${item.item}`} />
        ))}
      </ScrollView>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          placeholder="Digite aqui"
          placeholderTextColor="white"
          onChangeText={(e) => setInputItem(e)}
          value={inputItem}
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
}
const styles = StyleSheet.create({
  text: {
    fontSize: 23,
    color: "#2196F3",
    marginTop: 20,
    fontWeight: "bold",
    marginBottom: 25,
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
