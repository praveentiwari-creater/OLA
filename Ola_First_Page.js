import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, TextInput, PermissionsAndroid,
  Platform, Dimensions, Alert, Modal,ScrollView
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import Geocoder from 'react-native-geocoding';
// import Geocoder from 'react-native-geocoder';
import { useDispatch, useSelector } from 'react-redux';
import { currentLocation, destinationLocation } from './SRC/index';

function Ola_First_Page() {
  const region = useSelector(state => state.region);
  const latlong = useSelector(state => state.latlong);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [currentShow1, setCurrentShow1] = useState(false);
  const [currentShow2, setCurrentShow2] = useState(false);
  // const [reginShow, setRegintShow] = useState(region);

  callLocation = (that) => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("call location osition", position);
        dispatch(currentLocation(position))
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  function location() {
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

  geocoding = () => {
 
//     var NY = {
//       lat: 28.6139,
//       lng: 77.2090
//     };
    
//     Geocoder.geocodePosition(NY).then(res => {
// console.log('ppostionnnnnnn geocoder',res)
//     })
//     .catch(err => console.log(err))
    

    // Geocoder.init("AIzaSyBA_djd0YJK-a-7Rk7Cg8-4pS6Dz3aWhys");
    // Geocoder.from(region.latitude, region.longitude)
    //   .then(json => {
    //     var addressComponent = json.results[0].address_components[0];
    //     console.log('check name of latlong', addressComponent);
    //   })
    //   .catch(error => console.warn(error));
  }

  let test = { LatTest1: 0, Longtest1: 0 };
  let test1=region.latitude;
  return (
   
    <View style={{flex:1}} >
 <ScrollView>
      <View style={{flex:2}}>
      <View style={styles.viewTextInput}>
        <TouchableOpacity onPress={() => { location(), setShow(true), setCurrentShow1(true) }}>
          <View style={styles.textinput1}>
            {currentShow1==true ?
            <TextInput placeholder='your current location'
              style={{ width: 300, height: 35, marginTop: 10 }}
              value={"Lat  "+region.latitude.toString()+  "  Long  " +region.longitude.toString()}
            />
            :
            <TextInput placeholder='your current location'
            style={{ width: 300, height: 35, marginTop: 10 }}  />
            }
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalShow(true)}>
          <View style={styles.textinput2}>
          {currentShow2==true ?
            <TextInput placeholder=' your destination'
              style={{ width: 300, height: 35, marginTop: 10 }}
              value={"Lat  "+latlong.latitude.toString()+  "  Long  " +latlong.longitude.toString()}
            />
            :
            <TextInput placeholder=' your destination'
            style={{ width: 300, height: 35, marginTop: 10 }}/>
          }
          </View>
        </TouchableOpacity>
        </View>
      </View>

      <View style={{flex:7}}>
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
                radius={1800}
                strokeWidth={2}
                strokeColor="blue"
                fillColor="pink"
              /> 

              <MapView.Marker
        
                coordinate={latlong}
                // centerOffset={{x:-5,y:1 }}
                // anchor={{x:-5, y:1}}
              />
              <MapView.Circle
                center={{
                  latitude: latlong.latitude,
                  longitude: latlong.longitude,
                }}
                radius={1800}
                strokeWidth={2}
                strokeColor="red"
                fillColor="pink"
              /> 

            </MapView>

            :

            <MapView
              style={styles.map}
              region={latlong}
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
          Alert.alert("Modal has been closed.")
        }} >

        <View style={styles.modal}>

          <Text style={styles.text} onPress={() => {
          setModalShow(false),
            dispatch(destinationLocation(test = { LatTest1: 28.6139, Longtest1: 77.2090 })),setCurrentShow2(true)
          }}>New Delhi</Text>

          <Text style={styles.text} onPress={() => {
          setModalShow(false),
            dispatch(destinationLocation(test = { LatTest1: 28.9845, Longtest1: 77.7064 })),setCurrentShow2(true)
          }}>Meerut</Text>

          <Text style={styles.text} onPress={() => {
          setModalShow(false),
            dispatch(destinationLocation(test = { LatTest1: 28.6692, Longtest1: 77.4538 })),setCurrentShow2(true)
          }}>Ghaziyabad</Text>

          <Text style={styles.text} onPress={() => {
          setModalShow(false),
            dispatch(destinationLocation(test = { LatTest1: 28.4595, Longtest1: 77.0266 })),setCurrentShow2(true)
          }}>Gurugram</Text>

          <Text style={styles.text} onPress={() => {
          setModalShow(false),
            dispatch(destinationLocation(test = { LatTest1: 28.4089, Longtest1: 77.3178 })),setCurrentShow2(true)
          }}>Faridabad</Text>

        </View>
      </Modal>

      <View style={{flex:1}}>
        <View style={styles.viewcar1}>
          <Text style={{fontSize:16,marginLeft:15}}>Taxi</Text>
          <Text style={{fontSize:16}}>Micro</Text>
          <Text style={{fontSize:16}}>mini</Text>
          <Text style={{fontSize:16,marginRight:35}}>Luxary</Text>
        </View>
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
      </ScrollView>
    </View>
   
  )
}
export default Ola_First_Page;

const styles = StyleSheet.create({
  viewTextInput: {
    // position: 'relative',
    top: 20
  },
  viewcar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'relative',
    
    left: 10,
  },
  viewcar1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'relative',
   marginTop:485,
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
    height: 440,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 40,

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  modal: {
    position: 'absolute',
    top: 150,
    left: 20,
    width: '90%',
    height: 230,
    backgroundColor: 'white',
    borderRadius: 10
  },
  text: {
    fontSize: 20,
    marginTop: 15,
    textAlign: 'center'
  }
})