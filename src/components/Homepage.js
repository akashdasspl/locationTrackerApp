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

export default function HomePage({
  appName,
  Dname,
  Uid,
  BrandName,
  ip,
  longitude,
  latitude,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.Headertext}>{appName}</Text>
      <View style={styles.DeviceInfo}>
        <Text style={styles.Headingtext}>Device Information</Text>
        <Text style={styles.text}>Device name :{Dname}</Text>
        <Text style={styles.text}>Device ID :{Uid}</Text>
        <Text style={styles.text}>Device Brand name :{BrandName}</Text>
        <Text style={styles.text}>Device IP Address :{ip}</Text>
        <Text style={styles.text}>longitude:{longitude}</Text>
        <Text style={styles.text}>latitude:{latitude}</Text>
        {/*<Text style={styles.text}>10sec ago longitude:{plon}</Text>
              <Text style={styles.text}>10sec ago latitude:{plat}</Text>
              <Text style={styles.text}>time:{time}</Text>*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  text: {
    fontSize: 14,
    color: '#000',
    paddingVertical: 5,
  },
  Headertext: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#000',
    padding: 16,
  },
  DeviceInfo: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    borderBottomColor: '#000',
    borderWidth: 1,
  },
  Headingtext: {
    color: '#000',
    fontSize: 24,
    marginBottom: 24,
  },
});
