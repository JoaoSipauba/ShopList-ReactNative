import "react-native-gesture-handler";
import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import { CheckBox } from "react-native-elements";


function Item(props) {
    const [check , setCheck] = useState(false)
    function checkFunc() {
        if (check === true) {
            setCheck(false)
        }else{
            setCheck(true)
        }
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
      <CheckBox onPress={checkFunc} checked={check} size={27}/>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(48,146,253,0.10)",
    alignItems:"center",
    paddingLeft: 15,
    marginTop: 8,
  },
});
export default Item;
