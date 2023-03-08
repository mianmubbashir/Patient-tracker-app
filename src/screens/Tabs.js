import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Profile from "./Profile.js";
import PatientInfo from "./PatientInfo";
import { Image , StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function Tabs() {

  return (
    <Tab.Navigator style={{ color: "#48d1cc"}} screenOptions={{headerShown: false}}>
      <Tab.Screen
       name="Home" 
       component={Home} 
       options={{
        tabBarLabelStyle: {
          position: "relative",
          bottom: 1,
          paddingTop:5
        },
        tabBarIcon: ({ focused, color, size}) => (
        <Image
         source={
           focused 
           ? require("../../assets/Pic6.png")
           : require("../../assets/Pic5.png")
          }
          style={{
            position: "relative",
            bottom: 1,
            width: size,
            height: size
           }}
          />
      )}}/> 
      <Tab.Screen
       name="PatientInfo" 
       component={PatientInfo} 
       options={{
        tabBarLabel: "Add Patient",
        tabBarLabelStyle: {
          position: "relative",
          bottom: 1
        },
        tabBarIcon: ({ focused, color, size}) => (
        <Image
          source={
            focused 
            ? require("../../assets/Pic8.png")
            : require("../../assets/Pic7.png")
           }

           onPress={()=>{navigation.navigate('PatientInfo')}}
           style={{
            position: "relative",
            bottom: 17,
            width: size * 2,
            height: size * 2,
            borderRadius: size
           }}
           />
       ),
       }}
       /> 
       <Tab.Screen
       name="Profile" 
       component={Profile} 
       options={{
        tabBarLabel: "Profile",
        tabBarLabelStyle: {
          position: "relative",
          bottom: 1,
          paddingTop:5
        },
        tabBarIcon: ({ focused, color, size}) => (
        <Image
          source={
            focused 
            ? require("../../assets/Pic10.png")
            : require("../../assets/Pic9.png")
           }
           onPress={()=>{navigation.navigate('Profile')}}
           style={{
            position: "relative",
            bottom: 1,
            width: size,
            height: size
           }}
           />
       ),
       }}
       /> 
    </Tab.Navigator>
  );
}

