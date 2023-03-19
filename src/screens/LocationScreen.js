import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

function LocationScreen() {
  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

      <View style={styles.container}>
        <Text style={{color: '#000'}}>start</Text>
      </View>
    </>
  );
}
export default LocationScreen;
const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', flex: 1},
});
