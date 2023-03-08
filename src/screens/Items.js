import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Items ({itemData}) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Pic3.png")}/>
     <View style={styles.subContainer}>
     <Text style={styles.name}>{itemData.name}</Text>
     <Text style={styles.disease}>{itemData.disease}</Text>
     <Text style={styles.date}>{itemData.date}</Text>
     <Text style={styles.cost}>{itemData.cost}</Text>
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 5,
    paddingLeft: 25,
    marginLeft: 4,
    marginRight: 25,
    borderWidth: 2,
    borderColor: "#ECECEC",
    borderRadius: 8
  },
  subContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10
  },
  name: {
    fontSize: 15,
    fontWeight: "bold"
  },
  disease: {
    fontSize: 15,
    color: "#8C8FA5",
    paddingBottom: 3
  },
  date: {
    fontSize: 12
  },
  cost: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0E8388"
  }
})