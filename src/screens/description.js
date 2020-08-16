import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, AsyncStorage } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

let ScreenWidth = Dimensions.get("window").width / 100;
let ScreenHeight = Dimensions.get("window").height / 100;

function Description({ route, navigation }) {
  const dispatch = useDispatch();

  var item = route.params.item;
  var index = route.params.index;
  const data = useSelector((state) => state.categoria);

  const [input, setInput] = useState(item.descrição)
  
  async function save() {
    if (input !== item.descrição) {
      let categorias = []
      await AsyncStorage.getItem("Categorias").then((array) => {
        categorias = JSON.parse(array);
      });
      // console.warn();
      categorias[data.index].lista[index].descrição = input;
      await AsyncStorage.setItem("Categorias",JSON.stringify(categorias)).then(()=>{
        dispatch({ type: "ADD_CATEGORIA", data: categorias[data.index] });
      })
      
    }
  }

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "rgba(220,220,220,0.6)",
          height: ScreenHeight * 6,
          width: ScreenWidth * 100,
        }}
      ></View>
      <Text style={styles.text}>{item.item}</Text>
      <TextInput
        multiline={true}
        style={styles.input}
        placeholder="Adicionar descrição"
        placeholderTextColor="#808080"
        value={input}
        onChangeText={(e)=> setInput(e)}
      ></TextInput>

      <TouchableOpacity activeOpacity={0.8} onPress={save}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Salvar descrição</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#2196F3",
    paddingVertical: ScreenHeight * 3,
    marginLeft: ScreenWidth * 5,
    alignSelf: "flex-start",
  },
  input: {
    backgroundColor: "rgba(220,220,220,0.6)",
    width: ScreenWidth * 90,
    height: ScreenHeight * 30,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 15,
    fontWeight: "bold",
    fontSize: 17,
  },
  button: {
    backgroundColor: "#2196F3",
    height: ScreenHeight * 6.5,
    width: ScreenWidth * 90,
    marginTop: ScreenHeight * 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
});

export default Description;
