import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoadingScreen from './src/screens/LoadingScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import colors from './src/utils/colors';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.darkWhite} barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          options={{headerShown: false}}
          name="Loading"
          component={LoadingScreen}
        />
        <Stack.Screen
          options={{headerShown: false, gestureEnabled: false}}
          name="Onboarding"
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Home"
          options={{
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: 23,
              fontWeight: 'bold',
              color: colors.title,
            },
            headerStyle: {
              shadowOffset: {height: 0, width: 0},
              backgroundColor: colors.darkWhite,
              elevation: 0,
            },

            headerTitle: 'My Notes',
            gestureEnabled: false,
            headerLeft: null,
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Detail"
          options={{
            headerBackTitleVisible: false,
            headerTitle: '',
            headerStyle: {
              shadowOffset: {height: 0, width: 0},
              backgroundColor: colors.white,
              elevation: 0,
            },
          }}
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
