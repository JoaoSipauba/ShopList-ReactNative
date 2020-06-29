import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tela de categorias.</Text>
      <Button
        title="Ver lista"
        onPress={() => navigation.navigate('Lista')}
      />
    </View>
  );
}
export default HomeScreen;