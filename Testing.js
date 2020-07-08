import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, TextInput, PermissionsAndroid,
  Platform, Dimensions, Alert,Modal,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import {Provider} from 'react-redux';
// import store from './SRC/store';
// import {useDispatch,useSelector} from 'react-redux';
// import {currentLocation,destinationLocation} from './SRC/index';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function Testing() {
// const region=useSelector(state=>state.region);
// const latlong=useSelector(state=>state.latlong);
// const dispatch=useDispatch();
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [latlong, setLatlong] = useState({
    latitude:LATITUDE,
    longitude:LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  

  callLocation = (that) => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("call location osition", position);
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  function location() {
    //  var that=this;
    var that;
    if (Platform.OS === 'ios') {
      callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            'title': 'Location Access Required',
            'message': 'This App needs to Access your location'
          }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            callLocation(that);
          } else {
            alert("Permission Denied");
          }
        } catch (err) {
          alert("err", err);
          console.warn("erooe", err)
        }
      }
      requestLocationPermission();
    }
  }


  return (
    <Provider store={store}>
    <View>
      <View style={styles.viewTextInput}>
        <TouchableOpacity onPress={() => { location(), setShow(true) }}>
          <View style={styles.textinput1}>
          <TextInput placeholder='your current location' style={{width:150,height:35,marginTop:10}} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setModalShow(true)}>
        <View style={styles.textinput2}>
          <TextInput placeholder=' your destination'  style={{width:150,height:35,marginTop:10}} />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.container}>
          {show == true ?
            <MapView
              style={styles.map}
              region={region}
              provider={PROVIDER_GOOGLE}
              zoomEnabled={true}
            >
              <MapView.Marker
                coordinate={region}
                pinColor='blue'
              />

              <MapView.Circle
                center={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
                radius={7000}
                strokeWidth={2}
                strokeColor="blue"
                fillColor="pink"
              />

              <MapView.Marker
                coordinate={latlong}
               
              />

            </MapView>

            :

            <MapView
              style={styles.map}
              region={region}
              provider={PROVIDER_GOOGLE}
              zoomEnabled={true}
            >
            </MapView>
          }

        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalShow}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }} >

          <View style={styles.modal}>
            <TouchableOpacity>
            <Text style={styles.text} onPress={()=>{setModalShow(false),
               setLatlong({latitude:28.7041, longitude:77.1025, latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,})}}>Delhi</Text>

            <Text style={styles.text} onPress={()=>{setModalShow(false),
              setLatlong({latitude:28.9931, longitude:77.0151, latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,})}}>Sonipat</Text>

            <Text style={styles.text} onPress={()=>{setModalShow(false),
             setLatlong({latitude:28.9845, longitude:77.7064, latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,})}}>Meerut</Text>

            <Text style={styles.text} onPress={()=>{setModalShow(false),
             setLatlong({latitude:28.6692, longitude:77.4538, latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,})}}>Ghaziyabad</Text>
            </TouchableOpacity>

          </View>
      </Modal>


      <View>
        <View style={styles.viewcar} >
          <TouchableOpacity onPress={() => console.log(' you are selected taxi')}>
            <Image source={require('./ICONS/taxi.png')} style={{ width: 70, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log(' you are selected mini')}>
            <Image source={require('./ICONS/mini.png')} style={{ width: 70, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log(' you are selected micro')}>
            <Image source={require('./ICONS/micro.png')} style={{ width: 70, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log(' you are selected vip')}>
            <Image source={require('./ICONS/vip.png')} style={{ width: 70, height: 40, marginRight: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </Provider>
  )
}
export default Testing;

const styles = StyleSheet.create({
  viewTextInput: {
    position: 'relative',
    top: 20
  },
  viewcar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    top: 500,
    left: 10,
  },
  textinput1: {
    width: 300,
    marginLeft: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10
  },
  textinput2: {
    marginTop: 10,
    marginLeft: 50,
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10
  },
  boldText: {
    fontSize: 30,
    color: 'red',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 50,

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  modal: {
    position: 'absolute',
    top: 150,
    left: 20,
    width: '90%',
    height: 200,
    backgroundColor: 'pink',
    borderRadius: 10
},
text:{
  fontSize:20,
  marginTop:15,
  textAlign:'center'
}
})