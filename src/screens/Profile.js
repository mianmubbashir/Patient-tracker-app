import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebaseconfig"
import AuthContext from "./Context";

export default function Profile () {
  const [profileData, setProfileData] = useState();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const dbRef = ref(database, "User/" + authContext.user);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setProfileData(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
      <Image source={require("../../assets/Pic12.png")}/>
      </View>
      <View style={styles.Text}>
        <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#0E8388' }}>My Profile</Text>
        <Text style={{ fontSize: 25, fontWeight: 'bold',paddingTop: 30 }}>Dr {profileData?.username}</Text>
        <Text style={{ fontSize: 25, fontWeight: 'bold',paddingTop: 30 }}>{profileData?.email}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    paddingTop: 200
  },
  Text: {
    position: 'relative',
    paddingTop: 30
  }
})
