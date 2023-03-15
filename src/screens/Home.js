import { Text, View, TextInput } from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native';
import PatientList from './PatientList';


 export default function Home () {
  const { height, width } = useWindowDimensions();
  return (
  <View style={{ width: width }}>
   <View style={{alignItems: 'center', width: width, backgroundColor: '#0E8388',borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50}}>
    <Text style={{fontSize: 17, marginTop: 80, marginRight: 220}}>welcome Back</Text>
    <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10, marginRight: 240}}>Let's find</Text>
    <Text style={{fontSize: 20, fontWeight: 'bold', marginRight: 170, paddingBottom: 20}}>your top patient!</Text>
  </View>
  <View style={{height: height, width: width, alignItems: 'center'}}>
  <PatientList />
  </View>
  </View>
  )
}
