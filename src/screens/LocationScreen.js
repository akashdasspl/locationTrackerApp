import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
function LocationScreen() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  Geolocation.getCurrentPosition(data => setLongitude(data.coords.longitude));
  Geolocation.getCurrentPosition(data => setLatitude(data.coords.latitude));

  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View style={{flex: 1}}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}></MapView>
      </View>
    </>
  );
}
export default LocationScreen;
const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', flex: 1},
});
