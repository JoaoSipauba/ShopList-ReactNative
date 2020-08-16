import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import HomeScreen from "./src/screens/home";
import Lista from "./src/screens/lista";
import AddCategoria from "./src/screens/addCategoria";

import Description from "./src/screens/description";

const Stack = createStackNavigator();

function Routes() {

  return (
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
            title: "ShopList",
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
            title: "Criar lista",
            headerStyle: {
              backgroundColor: "#2196F3",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign:"center"
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
            headerTitleAlign:"center"
          }}
        />
        <Stack.Screen
          name="Description"
          component={Description}
          options={{
            title: "Descrição do item",
            headerStyle: {
              backgroundColor: "#2196F3",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign:"center"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
