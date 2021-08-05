import React, {useEffect} from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

import colors from '../utils/colors';

const LoadingScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  const controlFirstOpen = async () => {
    const isFirstOpen = await AsyncStorage.getItem('firstOpen');
    if (isFirstOpen === 'false') {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Onboarding');
    }
  };

  useEffect(() => {
    controlFirstOpen();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notely</Text>
      <ActivityIndicator size="large" color={colors.app} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: colors.title,
    marginBottom: 40,
    fontSize: 50,
  },
});

export default LoadingScreen;
