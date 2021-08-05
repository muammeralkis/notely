import axios from 'axios';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import colors from '../../utils/colors';

const NoteCard = ({item, navigation, setRefreshing}) => {
  const baseUrl = 'http://localhost:3000/';
  const {title, date, content, id} = item;

  const goDetail = () => {
    navigation.navigate('Detail', item);
  };

  const deleteAlert = () => {
    Alert.alert('Warning!', 'Are you sure you want to delete this note?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteItem()},
    ]);
  };

  const deleteItem = async () => {
    await axios.delete(baseUrl + 'notes/' + id);
    setRefreshing(true);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() => deleteAlert()}
      onPress={() => goDetail()}
      style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.seperator} />
      <Text numberOfLines={4} style={styles.content}>{content}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 7,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 5,
  },
  title: {
    color: colors.title,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 10,
  },
  date: {
    color: colors.title,
    fontSize: 12,
    marginBottom: 20,
  },
  seperator: {
    borderWidth: 1,
    borderColor: colors.seperatorGrey,
    marginBottom: 20,
  },
  content: {
    color: colors.description,
  },
});

export default NoteCard;
