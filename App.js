import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Provider } from "react-redux";

import HomeScreen from "./src/screens/home";
import Lista from "./src/screens/lista";
import AddCategoria from "./src/screens/addCategoria";
import Icon from "react-native-vector-icons/FontAwesome";

import store from "./src/store/index";

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Shop List",
              headerStyle: {
                backgroundColor: "#2196F3",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Lista"
            component={Lista}
            options={{
              title: "Lista de Compras",
              headerStyle: {
                backgroundColor: "#2196F3",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="AddCategoria"
            component={AddCategoria}
            options={{
              title: "Criar categoria",
              headerStyle: {
                backgroundColor: "#2196F3",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
