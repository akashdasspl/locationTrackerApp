import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Alert,
  Button,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {getDatabase, ref, set, update} from 'firebase/database';
import {db} from '../../config';
import DeviceInfo from 'react-native-device-info';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
import Buttons from '../components/buttons';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import HomePage from '../components/Homepage';
function LocationScreen() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [username, setusername] = useState([]);
  const [ip, setIp] = useState('');
  const [granted, setGranted] = useState(false);
  const [Dname, setDname] = useState([]);
  const [Uid, setUid] = useState([]);
  const [previousDATA, setpreviousDATA] = useState([]);
  const [asdtime, setasdtime] = useState([]);

  const [plon, setPlon] = useState('');
  const [plat, setPlat] = useState('');
  const [time, settime] = useState('');
  const [Currenttime, setCurrenttime] = useState('');

  const array = [...array, Uid];

  const trackLocation = () => {
    Geolocation.watchPosition(data => setLongitude(data.coords.longitude));
    Geolocation.watchPosition(data => setLatitude(data.coords.latitude));
  };
  const trackLocationP = () => {
    if (plat == latitude || plon == longitude) {
      console.log('same');
    } else {
      setCurrenttime(new Date().toLocaleString());
      settime(new Date().getTime());

      console.log('asd', previousDATA);
      Geolocation.getCurrentPosition(data => setPlon(data.coords.longitude));
      Geolocation.getCurrentPosition(data => setPlat(data.coords.latitude));
      setpreviousDATA(e => [
        ...e,
        {latitude: plat, longitude: plon, time: time},
      ]);
    }
  };

  useEffect(() => {
    sendEvent();
    setTimeout(() => {
      trackLocationP();
    }, 1000);
  });
  DeviceInfo.getIpAddress().then(ip => {
    setIp(ip);
  });
  const appName = DeviceInfo.getApplicationName();
  const BrandName = DeviceInfo.getBrand();
  console.log(appName);
  DeviceInfo.getDeviceName().then(deviceName => {
    setDname(deviceName);
  });
  DeviceInfo.getUniqueId().then(uniqueId => {
    setUid(uniqueId);
  });

  function sendEvent() {
    console.log('time2', time);

    set(ref(db, 'users/' + array), {
      latitude: latitude,
      longitude: longitude,
      ip: ip,
      Dname: Dname,

      time: time,
      Currenttime: Currenttime,

      previousDATA: previousDATA,
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
        (await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)) ===
          RESULTS.GRANTED ||
        (await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)) ===
          RESULTS.GRANTED ||
        (await request(PERMISSIONS.IOS.LOCATION_ALWAYS)) === RESULTS.GRANTED
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
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
      <View style={{flex: 1}}>
        {!granted && (
          <Buttons
            title="Ask permission again"
            onPress={requestLocationPermission}
          />
        )}
        {granted && (
          <HomePage
            appName={appName}
            Dname={Dname}
            Uid={Uid}
            BrandName={BrandName}
            ip={ip}
            latitude={latitude}
            longitude={longitude}
          />
        )}
      </View>
    </>
  );
}
export default LocationScreen;
