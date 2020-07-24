import "react-native-gesture-handler";
import * as React from "react";

import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Modal,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Categoria from "../components/categoria";
import Icon from "react-native-vector-icons/FontAwesome";

let ScreenHeight = Dimensions.get("window").height / 100;
let ScreenWidth = Dimensions.get("window").width / 100;

function HomeScreen({ navigation }) {
  const [categorias, setCategorias] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [categoriaIndex, setCategoriaIndex] = React.useState();

  React.useEffect(() => {
    const loadCategoria = navigation.addListener("focus", () => {
      function getCategorias() {
        AsyncStorage.getItem("Categorias").then((data) => {
          setCategorias(JSON.parse(data));
        });
      }
      getCategorias();
    });
    return loadCategoria;
  }, [navigation]);

  function deleteCategoria() {
    let array = categorias;
    array.splice(categoriaIndex);
    setCategorias(array);
    AsyncStorage.setItem("Categorias", JSON.stringify(array)).then(() => {
      setModalVisible(false);
    });
  }
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.text}>Categorias</Text>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Icon
                  style={{
                    alignSelf: "flex-end",
                    marginTop: -30,
                    marginRight: -25,
                  }}
                  name="times"
                  size={30}
                  color="black"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />
                <Text style={styles.modalText}>
                  Deseja excluir esta categoria?
                </Text>

                <View style={{ flexDirection: "row" }}>
                  <TouchableHighlight
                    style={{
                      ...styles.openButton,
                      backgroundColor: "#2196F3",
                    }}
                    onPress={deleteCategoria}
                  >
                    <Text style={styles.textStyle}>Confirmar</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          {categorias.length >=1 ? (
            categorias.map((categoria, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onLongPress={() => {
                  setModalVisible(true);
                  setCategoriaIndex(index);
                }}
              >
                <Categoria
                  index={index}
                  data={categoria}
                  color={categoria.cor}
                  nome={categoria.categoria}
                  navigation={navigation}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.null}>Cadastre uma nova categoria</Text>
          )}
        </View>
      </ScrollView>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => navigation.navigate("AddCategoria")}
      >
        <View style={styles.btnCriar}>
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>
            Criar Lista
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: "#2196F3",
    padding: 20,
    fontWeight: "bold",
  },
  btnCriar: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    height: ScreenHeight * 6,
    width: ScreenWidth * 94,
    borderRadius: 29,
    marginBottom: ScreenHeight * 1,
  },
  null: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 2,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    paddingTop: 10,
  },
});
export default HomeScreen;
