import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Alert,
  Button,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {getDatabase, ref, set} from 'firebase/database';
import {db} from '../../config';
import DeviceInfo from 'react-native-device-info';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
import Buttons from '../components/buttons';
function LocationScreen() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [username, setusername] = useState('akash');
  const [ip, setIp] = useState('');
  const [granted, setGranted] = useState(false);
  const [Dname, setDname] = useState('');
  const trackLocation = () => {
    Geolocation.getCurrentPosition(data => setLongitude(data.coords.longitude));
    Geolocation.getCurrentPosition(data => setLatitude(data.coords.latitude));
    // Alert.alert(`latitude :${latitude}  \n longitude : ${longitude}`);
  };
  useEffect(() => {
    sendEvent();
  });
  DeviceInfo.getIpAddress().then(ip => {
    setIp(ip);
  });
  const appName = DeviceInfo.getApplicationName();
  console.log(appName);
  DeviceInfo.getDeviceName().then(deviceName => {
    //console.log(deviceName);
    // setDname(deviceName);
  });
  DeviceInfo.getUniqueId().then(uniqueId => {
    console.log(uniqueId);
    setDname(uniqueId);
  });

  function sendEvent() {
    set(ref(db, 'users/' + username), {
      username: username,
      latitude: latitude,
      longitude: longitude,
      ip: ip,
    });
  }
  useEffect(() => {
    requestLocationPermission();
  }, []);
  useEffect(() => {
    if (granted) {
      trackLocation();
    }
  }, [granted]);
  const requestLocationPermission = async () => {
    try {
      if (
        (await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )) === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Granted');
        setGranted(true);
      } else {
        Alert.alert('location permission is required.');
        setGranted(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View style={{flex: 1}}>
        {!granted && (
          <Buttons
            title="Ask permission again"
            onPress={requestLocationPermission}
          />
        )}
        {granted && (
          <View style={styles.container}>
            <Text style={styles.text}>{appName}</Text>
          </View>
        )}
      </View>
    </>
  );
}
export default LocationScreen;
const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', flex: 1},
  text: {
    alignSelf: 'center',
  },
});
