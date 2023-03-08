import { FlatList, StyleSheet, Text, View,SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Items from "./Items";
import { ref, onValue, orderByChild, query, equalTo } from "firebase/database";
import { database } from "../../firebaseconfig";
import { useWindowDimensions } from "react-native";
import { useState, useEffect, useContext } from "react";
import AuthContext from "./Context";

export default function PatientList() {
  const { styles } = useStyle();
  const authcontext = useContext(AuthContext);

  const [userData, setUserData] = useState();
  const [filterData, setFilterData] = useState();

  useEffect(() => {
    const dataRef = ref(database, "Post");
    const postIdQuery = query(
      dataRef,
      orderByChild("userID"),
      equalTo(authcontext.user)
    );

    onValue(postIdQuery, (snapshot) => {
      const data = snapshot.val();
      console.log(JSON.stringify(data, null, 2));
      if (data !== null) {
        const postArr = Object.keys(data).map((key) => ({
          postuid: key,
          ...data[key],
        }));
        setUserData(postArr);
        setFilterData(postArr);
      } else {
        console.log("No data");
      }
    });
  }, []);

  return (

    <View style={styles.container}>
      {/* <Text style={styles.text}>Patient List</Text> */}
      <FlatList
      keyExtractor={(item)=>item.userID}
        data={filterData}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => <Items itemData={item} />}
      />
    </View>
  );
}

const useStyle = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      width: width,
      marginTop: 20,
      marginBottom: 90,
      marginLeft: 60,
      marginRight: 40,
      borderColor: "#000000",
    },
    text: {
      alignItems: "center",
      fontWeight: "bold",
      fontSize: 20,
      marginLeft: 140,
      marginBottom: 0,
    },
  });
  return { styles };
};
