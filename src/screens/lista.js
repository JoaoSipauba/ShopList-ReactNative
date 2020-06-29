import "react-native-gesture-handler";
import * as React from "react";

import { StyleSheet, View, Text, TextInput } from "react-native";
import { Button } from "react-native-elements";
import Item from "../components/item";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

function Lista() {
  const itens = [
    { item: "arroz" },
    { item: "feijao" },
    { item: "farinha" },
    { item: "arroz" },
    { item: "feijao" },
    { item: "farinha" },
    { item: "arroz" },
    { item: "feijao" },
    { item: "farinha" },
    { item: "arroz" },
    { item: "feijao" },
    { item: "farinha" },
    { item: "arroz" },
    { item: "feijao" },
    { item: "farinha" },
    { item: "arroz" },
    { item: "feijao" },
    { item: "farinha" },
    { item: "arroz" },
    { item: "feijao" },
    { item: "farinha" },
  ];
  return (
    <>
      <ScrollView>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={styles.text}>Mercado</Text>
        </View>
        {itens.map((item, index) => {
          return (<Item key={index} texto={`${item.item}`} />)
        })}
      </ScrollView>

      <View style={styles.viewInput}>
        <TextInput style={styles.input} placeholder="Digite aqui" />
        <Button
          type="clear"
          icon={<Icon name="plus-square" size={35} color="white" />}
          style={{ marginVertical: 0 }}
        />
      </View>
      {/* <View>
      </View> */}
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
    color: "#000",
    flex: 1,
  },
});

export default Lista;
