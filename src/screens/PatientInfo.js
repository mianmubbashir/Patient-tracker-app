import { Text, View, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { database, auth } from "../../firebaseconfig";
import { ref, set, push, serverTimestamp } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import AuthContext from "./Context";


export default function PatientInfo() {
  const { height, width } = useWindowDimensions();
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [disease, setDisease] = useState("");
  const [medication, setMedication] = useState("");
  const [date, setDate] = useState(new Date());
  const [cost, setCost] = useState("");

  // const [usdate, setUsDate] = useState(new Date());

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user?.uid);
      } else {
        // User is signed out
        // ...
        // setLoader(false);
      }
    });
  }, []);


  function createData() {
    // unique ID form firebase
    // const newKey = push(child(ref(database), 'users')).key;
    const postRef = ref(database, `Post`);
    const newpostRef = push(postRef);
    set(newpostRef, {
      userID: userID,
      name: name,
      disease: disease,
      medication: medication,
      date: serverTimestamp(),
      cost: cost
    })
      .then(() => {
        // Data saved successfully!
        alert("data updated!");
      })
      .catch((error) => {
        // The write failed...
        alert(error);
      });
  }

  
  return (
    <View
      style={{
        alignItems: "center",
        width: width,
        height: height,
        marginTop: 120,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50
      }}
    >
      
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#0E8388' }}>Enter Your Patient Details</Text>
      <TextInput
        placeholder="  Patient Name"
        value={name}
        onChangeText={(name) => {
          setName(name);
        }}
        style={{
          borderRadius: 100,
          color: "darkGreen",
          padding: 6,
          width: "70%",
          backgroundColor: "rgb(220,220,220)",
          marginVertical: 20,
          marginTop: 50
        }}
      />

      <TextInput
        placeholder="  Patient Disease "
        value={disease}
        onChangeText={(disease) => {
          setDisease(disease);
        }}
        style={{
          borderRadius: 100,
          color: "darkGreen",
          padding: 6,
          width: "70%",
          backgroundColor: "rgb(220,220,220)",
          marginVertical: 20,
        }}
      />

      <TextInput
        placeholder="  Medication Provide "
        value={medication}
        onChangeText={(medication) => {
          setMedication(medication);
        }}
        style={{
          borderRadius: 100,
          color: "darkGreen",
          padding: 6,
          width: "70%",
          backgroundColor: "rgb(220,220,220)",
          marginVertical: 20,
        }}
      />

      {/* <TextInput
        placeholder="  Date Of Arrival "
        value={date}
        onChangeText={(date) => {
          setDate(date);
        }}
        style={{
          borderRadius: 100,
          color: "darkGreen",
          padding: 6,
          width: "70%",
          backgroundColor: "rgb(220,220,220)",
          marginVertical: 20,
        }}
      /> */}
 
      <TextInput
        placeholder="  Cost "
        value={cost}
        onChangeText={(cost) => {
          setCost(cost);
        }}
        style={{
          borderRadius: 100,
          color: "darkGreen",
          padding: 6,
          width: "70%",
          backgroundColor: "rgb(220,220,220)",
          marginVertical: 20,
        }}
      />

      <View style={{ width: 250 }}>
        <TouchableOpacity
          onPress={() => createData()}
          style={{
            fontWeight: "bold",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0000FF",
            height: 40,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
