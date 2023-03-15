import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
// import { auth, database } from "../../firebaseconfig" // import auth from Firebase Auth
import { database } from "../../firebaseconfig";
import AuthContext from "./Context";
import { useWindowDimensions } from 'react-native';
import { getAuth, signOut } from "firebase/auth";

export default function Profile ({navigation}) {
  const { height, width } = useWindowDimensions();
  const [profileData, setProfileData] = useState();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const dbRef = ref(database, "User/" + authContext.user);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setProfileData(data);
    });
  }, []);

  const signOutUser = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        authContext.signout();
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <View style={{ width: width }}>
      <View style={{
        alignItems: 'center',
        width: width,
        marginBottom: 10,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: '#0E8388',
        borderBottomLeftRadius: 120,
        borderBottomRightRadius: 120
      }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50 }}> Your Profile Info</Text>
        <Image style={{ fontSize: 17, marginTop: 30 }} source={require("../../assets/Pic12.png")} />
        <Text style={{ color: "white", fontSize: 25, fontWeight: 'bold', paddingTop: 30 }}>Dr {profileData?.username}</Text>
      </View>

      <View style={{ height: height, width: width, alignItems: 'center' }}>
        <View >
          <Text style={{ fontSize: 25, fontWeight: 'bold', paddingTop: 30, marginTop: 60 }}> {profileData?.username}</Text>
          <Text style={{ fontSize: 25, fontWeight: 'bold', paddingTop: 30 }}>{profileData?.email}</Text>
          <View style={{ width: 200, marginTop: 100 }}>
            <TouchableOpacity onPress={signOutUser} style={{ fontWeight: "bold", alignItems: "center", justifyContent: "center", backgroundColor: "#0E8388", height: 40, marginLeft: 30 }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
