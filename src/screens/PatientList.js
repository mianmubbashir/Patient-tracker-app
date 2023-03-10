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

  // const [searchText, setSearchText] = useState('');
  // const [selectedDate, setSelectedDate] = useState('');

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

//   const filteredList = Items.filter((item) =>
//   item.name.toLowerCase().includes(searchText.toLowerCase()) &&
//   (selectedDate === '' || item.date === selectedDate)
// );



  return (

    <View style={styles.container}>

{/* <TextInput
  style={{height: height, width: width, alignItems: 'center'}} placeholder="Search by name" onChangeText={(text) => setSearchText(text)}
  value={searchText} />
  <DatePicker
  style={styles.datePicker}
  date={selectedDate}
  mode="date"
  placeholder="Select date"
  format="YYYY-MM-DD"
  minDate="2020-01-01"
  maxDate="2025-12-31"
  onDateChange={(date) => setSelectedDate(date)}
/> */}

{/* {filteredList.map((item) => (
  <ListItem key={item.id} name={item.name} date={item.date} />
))} */}

      <Text style={styles.text}>Patient List</Text>
      <FlatList
      //  keyExtractor={(item, index) => index.key}
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
      position: 'relative',
      height: height,
      marginTop: 20,
      paddingBottom: 313,
      marginLeft: 60,
      marginRight: 40,
      borderColor: "#000000"
    },
    text: {
      alignItems: "center",
      fontWeight: "bold",
      fontSize: 20,
      marginLeft: 140,
      marginBottom: 10,
    },
  });
  return { styles };
};
