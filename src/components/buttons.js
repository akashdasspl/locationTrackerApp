import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export default function Buttons({title, onPress}) {
  return (
    <View style={styles.Btn}>
      <TouchableOpacity onPress={onPress} style={styles.Buttons}>
        <Text style={styles.BtnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Btn: {
    alignSelf: 'center',
    marginTop: 24,
    alignItems: 'center',

    justifyContent: 'center',
    flex: 1,
  },
  BtnText: {
    fontSize: 18,
    color: '#fff',
    // marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  Buttons: {
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 20,
  },
});
