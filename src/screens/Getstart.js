import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Getstart({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.homeTop}>
       <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#0E8388' }}>Patiently</Text>
       <Text style={[styles.homeText2,
       {
        fontSize: 25,
        fontFamily: 'Roboto'
       },]}>Manage Your Patients,{"\n"}With Patiently</Text>
       </View>
       <View>
        <Image  style={styles.homeImage} resizeMode="contain" source={require('../../assets/Pic1.jpg')} />
      </View>
      <View  style={{width: 250}} >
      <TouchableOpacity style={{fontWeight:'bold',alignItems:'center', justifyContent: 'center', backgroundColor:"#0E8388", height: 40, marginLeft: 100, marginBottom: 50}} onPress={()=>{navigation.replace('Login')}}>
          <Text style={{color: 'white', fontWeight:'bold'}}>GET STARTED</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
container: {
    height: "100%",
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    textAlign: 'center'

},

homeImage: {
   height: undefined,
   width: '100%',
   aspectRatio: 1
},

homeTop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 90
},
 
 homeText2: {
  fontWeight: '600',
  paddingTop: 30
}

});


