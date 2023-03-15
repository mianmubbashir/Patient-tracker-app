import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
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

  const [patientdata, setPatientData] = useState();
  console.log("hello", patientdata);
  const [filterData, setFilterData] = useState();
  console.log("hello", filterData);

  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const dataRef = ref(database, "Post");
    const postIdQuery = query(
      dataRef,
      orderByChild("userID"),
      equalTo(authcontext.user)
    );

    onValue(postIdQuery, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const postArr = Object.keys(data).map((key) => ({
          postuid: key,
          ...data[key],
        }));
        setPatientData(postArr);
        setFilterData(postArr);
      } else {
        // console.log("No data");
      }
    });
  }, []);
  // console.log("data",filterData);

  const filteredList = (text) => {
    const searchFilter = patientdata.filter((item) => {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilterData(searchFilter);
    setSearchText(text);
    setSearchData(searchFilter);
  };
  console.log("search", searchData);

  const filterList = (text) => {
    const searchFilter = patientdata.filter((item) => {
      console.log("12333", new Date(item.date).toLocaleDateString())
     return new Date(item.date).toLocaleDateString() == text;
    });
    setFilterData(searchFilter);
    setSearchDate(text);
    setSearchData(searchFilter);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput1}
        placeholder="Search by name"
        onChangeText={(text) => filteredList(text)}
        value={searchText}
      />
      <TextInput
        style={styles.textinput2}
        placeholder="Search by date"
        onChangeText={(text) => filterList( text)}
        value={searchDate}
      />

      <Text style={styles.text}>Patient List</Text>
      <FlatList
        keyExtractor={(item) => item.postuid}
        data={filterData}
        showsVerticalScrollIndicator={false}
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
      position: "relative",
      height: height,
      marginTop: 20,
      Bottom: 240,
      marginLeft: 60,
      marginRight: 40,
      borderColor: "#000000",
    },
    text: {
      position: "relative",
      fontWeight: "bold",
      fontSize: 20,
      marginLeft: 140,
      top: -20,
    },
    textinput1: {
      backgroundColor: "rgb(220,220,220)",
      borderRadius: 20,
      // alignItems: "center",
      padding: 6,
      margin: 5,
      width: 170,
    },
    textinput2: {
      backgroundColor: "rgb(220,220,220)",
      borderRadius: 20,
      // alignItems: "center",
      position: "relative",
      padding: 6,
      marginLeft: 215,
      width: 170,
      top: -45,
    },
  });
  return { styles };
};
