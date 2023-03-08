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
import { useState, useContext } from "react";
import { auth } from "../../firebaseconfig";
import {signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "./Context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [user, setUser] = useState({ email: "", password: "" });
  
  const authcontext = useContext(AuthContext);

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

  const signinUser = () => {
    console.log(user.email);
    console.log("signin");
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        console.log("SUCCESSFULLY SIGNIN", userCredential);
        authcontext.signin(userCredential.user.uid, () => {
          navigation.replace("Tabs");
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View
      style={{ alignItems: "center", width: width, backgroundColor: "#0E8388" }}
    >
      <Text style={{ fontSize: 64, fontWeight: "bold", marginVertical: 50 }}>
        Login
      </Text>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          height: height,
          width: width,
          borderTopLeftRadius: 200,
          paddingTop: 60,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>Welcome Back</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
          Login to your account
        </Text>
        {/* <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior='position'> */}
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
        {/* </KeyboardAvoidingView>
      </ScrollView> */}
        <View
          style={{ alignItems: "flex-end", width: width, paddingRight: 36 }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 15 }}>
            Forgot Password ?
          </Text>
        </View>
        <View style={{ width: 250 }}>
          <TouchableOpacity
            onPress={signinUser}
            style={{
              fontWeight: "bold",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0000FF",
              height: 40,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>LOGIN</Text>
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
              navigation.navigate("Signup");
            }}
          >
            <Text style={{ fontWeight: "bold", color: '#0E8388' }}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
