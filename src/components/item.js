import "react-native-gesture-handler";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { StyleSheet, View, Text, AsyncStorage } from "react-native";
import { CheckBox } from "react-native-elements";

function Item(props) {
  const [check, setCheck] = useState(props.checked);
  const [data, setData] = useState(useSelector((state) => state.categoria));

  async function checkFunc() {
    let categorias = []
    await AsyncStorage.getItem("Categorias").then(array=>{
      categorias=JSON.parse(array)
    })

    if (check === true) {
      setCheck(false);
      categorias[data.index].lista[props.index].checked=false
    } else {
      setCheck(true);
      categorias[data.index].lista[props.index].checked=true
    }

    await AsyncStorage.setItem("Categorias",JSON.stringify(categorias))
  }
  
  return (
    <View style={styles.item}>
      <Text
        style={{
          fontSize: 17,
          fontWeight: "bold",
          //   paddingVertical: 5,
        }}
      >
        {props.texto}
      </Text>
      <CheckBox onPress={checkFunc} checked={check} size={27} />
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
    paddingLeft: 15,
    marginTop: 8,
  },
});
export default Item;
