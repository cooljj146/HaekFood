import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState, useEffect}from 'react'
import {firebase} from '../../Firebase/firebaseConfig'
import {AntDesign} from '@expo/vector-icons';
import {navbtn, navbtnin, navtbnout, colors} from '../global/styles';

const UserProfile = ({navigation}) => {

  const [userLoggedUID, setUserLoggedUID] = useState(null);
  const [userData, setUserData] = useState(null);
  

      useEffect(() => {
          const checkLogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                //console.log(user);
                setUserLoggedUID(user.uid);
              }
              else {
                setUserLoggedUID(null);
                
              }
            })
           }
          checkLogin()
      }, [])

      //console.log(userData);

      useEffect(() => {
          const getUserData = async () => {
            const docRef = firebase.firestore().collection("UserData").where
            ('uid', '==', userLoggedUID);
            const doc = await docRef.get();
            if (!doc.empty) {
              doc.forEach((doc) => {
                setUserData(doc.data());
              })
            }
            else {
             // navigation.navigate('login');
             console.log('No such document!');
            }
          }
          getUserData();
      }, [userLoggedUID])

      //console.log(userData);
  return (
    <View style = {styles.containerout}>
      <TouchableOpacity onPress = {() => navigation.navigate('home')} 
      style = {navtbnout}>
          <View style = {navbtn}>
              <AntDesign name = "back" size = {24} color = "black" style = 
              {navbtnin} />
          </View>
      </TouchableOpacity>

      <View style = {styles.container}>
          <Text style = {styles.head1}>Your Profile</Text>
          <View style = {styles.containerin}>
          <Text style = {styles.head2}>Name: 
                        {userData ?
                         <Text style={styles.head2in}>{userData.name}
                         </Text> : 
                         'loading'}
          </Text>
          <Text style = {styles.head2}>Email: 
                        {userData ?
                         <Text style={styles.head2in}>{userData.email}
                         </Text> : 
                         'loading'}
          </Text>
          <Text style = {styles.head2}>Phone: 
                        {userData ?
                         <Text style={styles.head2in}>{userData.phone}
                         </Text> : 
                         'loading'}
          </Text>
          <Text style = {styles.head2}>Address: 
                        {userData ?
                         <Text style={styles.head2in}>{userData.address}
                         </Text> : 
                         'loading'}
          </Text>

          </View>
      </View>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
    
  containerout: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      width: '100%',
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'center',
      width: '100%',
  },
  head1: {
    fontSize: 40,
    fontWeight: '200',
    marginVertical: 20,
    color: colors.text1,
  },
  containerin: {
      width: '90%',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.text1,
      borderRadius: 10,
      padding: 20,
      marginTop: 20
  },
  head2: {
      fontSize: 20,
      fontWeight: '200',
      marginTop: 20,
  },
  head2in: {
      fontSize: 20,
      fontWeight: '300',
  }
})