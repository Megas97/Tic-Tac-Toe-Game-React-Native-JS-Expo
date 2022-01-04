import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home.js';
import GameScreen from './Game.js';

const Stack = createNativeStackNavigator();
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator initialRouteName='Home Screen' screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="Home Screen" component={HomeScreen} options={{ title: 'Tic-Tac-Toe' }} />
        <Stack.Screen name="Tic-Tac-Toe" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}