import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "./firebaseconfig"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import Home from "./src/screens/Home";
import Getstart from "./src/screens/Getstart";
import Signup from "./src/screens/Signup";
import Login from "./src/screens/Login";
import Tabs from "./src/screens/Tabs";
import AuthContext from "./src/screens/Context";


const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in");
        setUser(user.uid);
        setLoader(false);
      } else {
        console.log("User is not signed in");
        setLoader(false);
      }
    });
  }, []);

  function signin(newUser, callback) {
    setUser(newUser);
    callback();
  }

  function signout() {
    setUser(null);
  }

  let value = { user, signin, signout };

  if (loader) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      </View>
    );
  }
  return (
    <AuthContext.Provider value={value}>
    <NavigationContainer >
      <Stack.Navigator
      initialRouteName={user?.length > 0 ? "Tabs" : "Getstart"}
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Getstart" component={Getstart} />
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
