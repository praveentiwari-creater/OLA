import React from 'react';
import {Dimensions} from 'react-native';
import {CURRENT_LOCATION,DESTINATION_LOCATION,LOCATION} from './type';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let initialState={
    region:{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    },
    latlong:{
        latitude:LATITUDE,
        longitude:LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }
}

const ReducerCreater=(state=initialState, action)=>{
    switch(action.type){
   case CURRENT_LOCATION: return{
       ...state,
       region:{
        latitude: action.payload.coords.latitude,
        longitude: action.payload.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }

   }

   case DESTINATION_LOCATION:return{
       ...state,
       latlong:{
        latitude:action.payload.LatTest1,
        longitude:action.payload.Longtest1,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }
   }

   default:return state;

    }
}
export default ReducerCreater;