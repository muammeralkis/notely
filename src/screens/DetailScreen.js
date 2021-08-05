import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useEffect} from 'react/cjs/react.development';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../utils/colors';
import axios from 'axios';

const DetailScreen = ({route, navigation}) => {
  const baseUrl = 'http://localhost:3000/';

  const [title, setTitle] = useState('New Note');
  const [date, setDate] = useState();
  const [content, setContent] = useState(
    'In quo pertineant non quo aut voluptates repudiandae sint et impetus quo ignorare. Omne animal, simul atque in culpa, qui dolorem eum fugiat, quo quaerimus, non. Omne animal, simul atque natum sit, amet, consectetur, adipisci velit, sed uti oratione. In oculis quidem se ipsam voluptatem, quia voluptas expetenda, fugiendus dolor sit, amet. Torquatos nostros? quos dolores suscipiantur maiorum dolorum fuga et expedita distinctio nam libero. Tum dicere exorsus est primum igitur, inquit, modo ista sis aequitate, quam nihil.',
  );
  const [id, setId] = useState(Date.now());

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerRight}
          activeOpacity={0.5}
          onPress={() => saveChanges()}>
          <Ionicons name="checkmark-sharp" size={40} color={colors.app} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerLeft}
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-top-left"
            size={40}
            color={colors.title}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, title, content]);

  useEffect(() => {
    if (route.params) {
      const {title, date, content, id} = route.params;
      setTitle(title);
      setDate(date);
      setContent(content);
      setId(id);
    }
  }, [route]);

  const saveChanges = async () => {
    try {
      let result;
      if (route.params) {
        result = await axios.put(baseUrl + 'notes/' + id, {
          title,
          date: new Date().toLocaleString('tr-TR'),
          content,
          id: id,
        });
      } else {
        result = await axios.post(baseUrl + 'notes', {
          title,
          date: new Date().toLocaleString('tr-TR'),
          content,
          id: id,
        });
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message, [{text: 'Ok'}]);
    }
  };

  const onChangeTitle = event => {
    const text = event.nativeEvent.text;
    setTitle(text);
  };

  const onChangeContent = event => {
    const text = event.nativeEvent.text;
    setContent(text);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}>
        <ScrollView activeOpacity={0.8} style={styles.container}>
          <TextInput
            maxLength={100}
            multiline
            value={title}
            onChange={onChangeTitle}
            style={styles.title}
          />
          {date ? (
            <Text editable={false} style={styles.date}>
              {date}
            </Text>
          ) : null}
          <TextInput
            multiline
            value={content}
            onChange={onChangeContent}
            style={styles.content}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  headerLeft: {
    transform: [{rotate: '-45deg'}],
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerRight: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: colors.title,
    fontSize: 23,
    fontWeight: '700',
    marginTop: 10,
  },
  date: {
    color: colors.title,
    fontSize: 12,
    marginBottom: 20,
    marginTop: 10,
  },
  content: {
    color: colors.description,
  },
});

export default DetailScreen;
