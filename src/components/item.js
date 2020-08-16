import "react-native-gesture-handler";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StyleSheet, View, Text, AsyncStorage, Dimensions } from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

let ScreenWidth = Dimensions.get("window").width / 100;

function Item(props) {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.categoria);

  const [check, setCheck] = useState(props.checked);
  const [quantidade, setQuantidade] = useState(props.quantidade);

  async function getCategorias() {
    let categorias = [];
    await AsyncStorage.getItem("Categorias").then((array) => {
      categorias = JSON.parse(array);
    });

    return categorias;
  }
  async function checkFunc() {
    let categorias = await getCategorias();

    setCheck(!check);
    categorias[data.index].lista[props.index].checked = !check;
    categorias[data.index].index = data.index;
    await AsyncStorage.setItem("Categorias", JSON.stringify(categorias)).then(
      () => {
        dispatch({ type: "ADD_CATEGORIA", data: categorias[data.index] });
      }
    );
  }

  async function increase() {
    let categorias = await getCategorias();

    setQuantidade(quantidade + 1);
    categorias[data.index].lista[props.index].quantidade = quantidade + 1;
    await AsyncStorage.setItem("Categorias", JSON.stringify(categorias)).then(
      () => {
        dispatch({ type: "ADD_CATEGORIA", data: categorias[data.index] });
      }
    );
  }
  async function decrease() {
    if (quantidade > 1) {
      let categorias = await getCategorias();

      setQuantidade(quantidade - 1);
      categorias[data.index].lista[props.index].quantidade = quantidade - 1;
      await AsyncStorage.setItem("Categorias", JSON.stringify(categorias)).then(
        () => {
          dispatch({ type: "ADD_CATEGORIA", data: categorias[data.index] });
        }
      );
    }
  }

  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox onPress={checkFunc} checked={check} size={27} />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
          }}
          onPress={() => {
            // dispatch({ type: "ADD_ITEM", data: props.item})
            // console.warn(props.item);
            props.navigation.navigate("Description", {
              item: props.item,
              index: props.index,
            });
          }}
        >
          {props.texto}
        </Text>
      </View>
      <View style={styles.quantidade}>
        <Icon
          name="plus"
          size={18}
          color="#2196F3"
          onPress={increase}
          onLongPress={() => setQuantidade(quantidade + 10)}
        />
        <Text style={{ fontWeight: "bold", fontSize: 20, paddingBottom: 5 }}>
          {quantidade}
        </Text>
        <Icon
          name="minus"
          size={18}
          color="#2196F3"
          onPress={decrease}
          onLongPress={() => setQuantidade(1)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(48,146,253,0.10)",
    alignItems: "center",
    marginTop: 8,
  },
  quantidade: {
    marginRight: ScreenWidth * 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: ScreenWidth * 16,
    alignItems: "center",
  },
});
export default Item;
