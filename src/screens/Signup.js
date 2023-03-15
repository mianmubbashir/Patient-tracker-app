import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React from "react";
import { useWindowDimensions } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../firebaseconfig";
import { useState } from "react";
import { ref, set } from "firebase/database";


export default function Signup({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  console.log(user);

  const myBase = (userID) => {
    const FireRef = ref(database, "User/" + userID);
    set(FireRef, user);
  };

  const handleUserName = (username) => {
    setUser((prevUser) => ({
      ...prevUser,
      username: username,
    }));
  };

  const handleEmail = (email) => {
    setUser((prevUser) => ({
      ...prevUser,
      email: email,
    }));
  };

  const handlePassword = (password) => {
    setUser((prevUser) => ({
      ...prevUser,
      password: password,
    }));
  };

  const signUp = () => {
    console.log("signup");
    createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    )
      .then((userCredential) => {
        myBase(userCredential.user.uid);
        console.log("SUCCESSFULLY SIGNUP");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View
      style={{ alignItems: "center", width: width, backgroundColor: "#0E8388" }}
    >
      <Text style={{ fontSize: 64, fontWeight: "bold", marginTop: 50 }}>
        Signup
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 50 }}>
        Create a new account
      </Text>

      <View
        style={{
          backgroundColor: "#FFFFFF",
          height: height,
          width: width,
          borderTopLeftRadius: 200,
          paddingTop: 100,
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Username"
          onChangeText={handleUserName}
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
          placeholder="Email"
          onChangeText={handleEmail}
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
          placeholder="Password"
          onChangeText={handlePassword}
          secureTextEntry={true} 
          style={{
            borderRadius: 100,
            color: "darkGreen",
            padding: 6,
            width: "70%",
            backgroundColor: "rgb(220,220,220)",
            marginVertical: 20,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: width,
          }}
        >
          <Text style={{ fontSize: 13, marginBottom: 10 }}>
            By signing in, you agree to our{" "}
          </Text>
          <Text style={{ fontSize: 13, fontWeight: "bold", marginBottom: 18 }}>
            Terms and Conditions{" "}
          </Text>
        </View>
        <View style={{ width: 250 }}>
          <TouchableOpacity
            style={{
              fontWeight: "bold",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0E8388",
              height: 40
            }}
            onPress={signUp}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text>Don't have an account ? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ fontWeight: "bold", color: '#0E8388' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
