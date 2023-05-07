import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import hawk_logo from '../../../assets/hawk_logo.jpg'
import {colors, hr80} from '../../global/styles'

import {firebase} from '../../../Firebase/firebaseConfig'

    const WelcomeScreen = ({navigation}) => {
      const [userLogged, setUserLogged] = useState(null);

      useEffect(() => {
          const checkLogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                //console.log(user);
                //setUserLogged(user);
              }
              else {
                setUserLogged(null);
                console.log('No user logged in');
              }
            })
           }
          checkLogin()
      }, [])
      
      //console.log(userLogged);

      const handleLogout = () => {
          firebase.auth.signOut()
              .then(() => {
                  setUserLogged(null);
                  console.log("User logged out");
              })
              .catch((error) => {
                console.log(error);
              })
      }
        return (
          <View style = {styles.container}>
              <Text style = {styles.title}>Welcome to HawkEats</Text>
              <View style = {styles.logout}>
                  <Image source = {hawk_logo} style = {styles.logo}/>
              </View>
              {<View style = {hr80}/>}
              <Text style = {styles.text}>Find the best food around campus</Text>
              {<View style = {hr80}/>}

          {userLogged == null ?
            <View style = {styles.btnout}>
            <TouchableOpacity onPress={()=>navigation.navigate('signup')}>
              <Text style = {styles.btn}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('login')}>
              <Text style = {styles.btn}>Log In</Text>
            </TouchableOpacity>
          </View>
           :
           <View style = {styles.logged}>
               <Text style = {styles.txtlog}>Signed in as &nbsp;   
                  <Text style = {styles.txtlogin}> 
                  {userLogged.email}</Text>
               </Text>
            <View style = {styles.btnout}>
              <TouchableOpacity onPress={()=>navigation.navigate('home')}>
                <Text style = {styles.btn}>Go to Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> handleLogout()}>
                <Text style = {styles.btn}>Log Out</Text>
              </TouchableOpacity>
            </View>
           </View>
           }

          </View>
        )
    }

    const styles = StyleSheet.create({
      container : {
        flex: 1,
        backgroundColor: '#ff4242',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      },
      title: {
        fontSize: 50,
        color: colors.col1,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: '200'
      },
      logout: {
        width: "80%",
        height: "30%",
        alignItems: 'center'
      },
      logo: {
        width: '100%',
        height: '100%'
      },
      text: {
        fontSize: 18,
        width: '80%',
        color: colors.col1,
        textAlign: 'center',
      },
      btnout: {
        flexDirection: 'row'
      },
      btn: {
        fontSize: 20,
        color: colors.text1,
        textAlign: 'center',
        marginVertical: 30,
        marginHorizontal: 10,
        fontWeight: '700',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
      },
      logged: {
        alignItems: 'center'
      },
      txtlog: {
          fontSize: 18,
          color: colors.col1,
      },
      txtlogin: {
          fontSize: 19,
          color: colors.col1,
          fontWeight: '700',
          textDecorationStyle: 'solid',
          textDecorationLine: 'underline'
      }

    })

    export default WelcomeScreen