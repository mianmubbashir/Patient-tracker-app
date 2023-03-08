import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import Home from "./src/screens/Home";
import Getstart from "./src/screens/Getstart";
import Signup from "./src/screens/Signup";
import Login from "./src/screens/Login";
import Tabs from "./src/screens/Tabs";
import AuthContext from "./src/screens/Context";

export default function App() {
  const Stack = createNativeStackNavigator();

  let [user, setUser] = useState("");
  function signin(newUser, callback) {
    setUser(newUser);
    callback();

  }

  function signout() {
    setUser(null);

  }

  let value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Getstarted" component={Getstart} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    textAlign: "center",
  },
});
