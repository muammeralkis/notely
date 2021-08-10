import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import NoteCard from './NoteCard';
import colors from '../../utils/colors';
import baseRequest from '../../_core/baseRequest';

const HomeScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notes, setNotes] = useState();

  const getNotes = async () => {
    try {
      const data = await baseRequest.get('notes');
      setNotes(data.data);
    } catch (e) {
      Alert.alert('Error', 'An error occurred', [{text: 'Ok'}]);
    }
    setRefreshing(false);
    setLoading(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (refreshing) {
      getNotes();
    }
  }, [refreshing]);

  useEffect(() => {
    if (isFocused) {
      getNotes();
    }
  }, [isFocused]);

  const search = async event => {
    const text = event.nativeEvent.text;

    try {
      const data = await baseRequest.get('notes' + '?q=' + text);
      setNotes(data.data);
    } catch (e) {
      Alert.alert('Error', 'An error occurred while searching', [{text: 'Ok'}]);
    }
  };

  const goDetail = () => {
    navigation.navigate('Detail');
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.searchContainer}>
            <Ionicons name="md-search-outline" size={16} color={colors.title} />
            <TextInput
              returnKeyType="search"
              onSubmitEditing={search}
              style={styles.searchInput}
              placeholder="Search anything"
              placeholderTextColor={colors.grey}
            />
          </View>

          <FlatList
            data={notes}
            renderItem={({item}) => (
              <NoteCard
                item={item}
                setRefreshing={setRefreshing}
                navigation={navigation}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
              />
            }
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.6}
            onPress={goDetail}>
            <View style={styles.buttonContainer}>
              <MaterialCommunityIcons
                name="plus"
                size={16}
                color={colors.white}
              />
              <Text style={styles.buttonText}>Create</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkWhite,
  },
  title: {
    fontWeight: 'bold',
    color: colors.title,
    marginBottom: 40,
    fontSize: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputGrey,
    borderRadius: 6,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
  },
  searchInput: {
    marginHorizontal: 5,
    width: '95%',
    paddingVertical: 10,
    color: colors.title,
  },
  button: {
    width: 105,
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
  },

  buttonText: {
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default HomeScreen;
