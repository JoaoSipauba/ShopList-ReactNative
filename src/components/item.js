import "react-native-gesture-handler";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StyleSheet, View, Text, AsyncStorage } from "react-native";
import { CheckBox } from "react-native-elements";

function Item(props) {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.categoria)

  const [check, setCheck] = useState(props.checked);

  async function checkFunc() {
    let categorias = [];
    await AsyncStorage.getItem("Categorias").then((array) => {
      categorias = JSON.parse(array);
    });

    setCheck(!check);
    categorias[data.index].lista[props.index].checked = !check;
    categorias[data.index].index = data.index;
    await AsyncStorage.setItem("Categorias", JSON.stringify(categorias)).then(()=>{
      dispatch({ type: "ADD_CATEGORIA", data: categorias[data.index] });
    })
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
        >
          {props.texto}
        </Text>
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
    // paddingLeft: 5,
    marginTop: 8,
  },
});
export default Item;
