import React from 'react';
import {View,ScrollView} from 'react-native';
import {Provider} from 'react-redux';
import store from './SRC/store';
import Ola_First_Page from  './Ola_First_Page';
// import Testing from './Testing';
function App(){
  return(
  
     <Provider store={store}>
     
  <View style={{flex:1}}>
 
<Ola_First_Page/>

  </View>

   </Provider>
 
  )
}
export default App;


//AndroidManifest.xml  file
// <!-- <meta-data
//      android:name="com.google.android.geo.API_KEY"
//      android:value="AIzaSyBA_djd0YJK-a-7Rk7Cg8-4pS6Dz3aWhys"/>
//   <!-- You will also only need to add this uses-libray tag -->
//    <uses-library android:name="org.apache.http.legacy" android:required="false"/> -->
