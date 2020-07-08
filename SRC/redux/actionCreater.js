import {CURRENT_LOCATION,DESTINATION_LOCATION,LOCATION} from './type';
export const currentLocation=(data1)=>{
    return{
        type:CURRENT_LOCATION,
        payload:data1
    }
}

export const destinationLocation=(data2)=>{
    return{
        type:DESTINATION_LOCATION,
        payload:data2
    }
}

export const onlyLocation=()=>{
    return{
        type:LOCATION
    }
}