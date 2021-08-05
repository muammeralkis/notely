import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../utils/colors';

const OnboardingScreen = ({navigation, route}) => {
  const navigate = async () => {
    await AsyncStorage.setItem('firstOpen', JSON.stringify(false));
    navigation.navigate('Loading');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notely</Text>
      <Text style={styles.description}>
        Capture what’s on your mind & get a reminder later at the right place or
        time. You can also add voice memo & other features
      </Text>
      <Image
        source={require('../assets/5272-scaled.jpg')}
        style={styles.image}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate()}
        style={styles.button}>
        <Text style={styles.buttonText}>Let's Start</Text>
        <Feather name="arrow-right" size={16} color={colors.darkNavy} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    position: 'absolute',
    left: 20,
    top: 116,
    color: colors.title,
  },
  description: {
    fontSize: 16,
    position: 'absolute',
    width: 335,
    left: 20,
    top: 185,
    color: colors.description,
  },
  image: {
    position: 'absolute',
    width: 900,
    height: 550,
    bottom: -80,
    left: -100,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    width: 120,
    position: 'absolute',
    backgroundColor: colors.app,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 200,
    paddingVertical: 15,
    right: 23,
    bottom: 40,
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default OnboardingScreen;
