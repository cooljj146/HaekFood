import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { navbtn, navbtnout, navbtnin, colors, hr80, btn1} from '../global/styles';
import {firebase} from '../../Firebase/firebaseConfig'

const PlaceOrder = ({navigation, route}) => {
  const {cartData} = route.params;
  const [orderData, setOrderData] = useState([]);
  const [totalCost, setTotalCost] = useState('0');

  //console.log(cartData)
  useEffect(() => {
      setOrderData(JSON.parse(cartData))
  }, [cartData])

 // console.log(typeof(orderData))
 useEffect(() => {
  if (cartData != null) {
    const parsedCartData = JSON.parse(cartData);
    const foodprice = parsedCartData.cart;
    if (foodprice) {
      let totalfoodprice = 0;
      foodprice.map((item) => {
        totalfoodprice =
          parseInt(item.data.foodPrice) * parseInt(item.Foodquantity) +
          parseInt(item.data.foodAddonPrice) * parseInt(item.addOnQuantity) +
          totalfoodprice;
      });
      setTotalCost(JSON.stringify(totalfoodprice));
    } else {
      setTotalCost("0");
    }
  }
}, [cartData]);

// user data ----------------------------------------
  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);
  useEffect(() => {
      const checklogin = () => {
          firebase.auth().onAuthStateChanged((user) => {
              // console.log(user);
              if (user) {
                  // navigation.navigate('home');
                  setUserloggeduid(user.uid);
              } else {
                  // No user is signed in.
                  console.log('no user');
              }
          });
      }
      checklogin();
  }, [])

  // // console.log(userloggeduid);

  useEffect(() => {
      const getuserdata = async () => {
          const docRef = firebase.firestore().collection("UserData").where('uid', '==', userloggeduid)
          const doc = await docRef.get();
          if (!doc.empty) {
              doc.forEach((doc) => {
                  setUserdata(doc.data());
              })
          }
          else {
              console.log('no user data');
          }
      }
      getuserdata();
  }, [userloggeduid]);

  //console.log(userloggeduid);
  //console.log(userdata);

  // place order----------------------------------
  const placenow = () => {
    const docRef = firebase.firestore().collection("UserOrders").doc(new Date().getTime().toString());
    docRef.set({
        orderid: docRef.id,
        orderdata: orderData.cart,
        orderstatus: 'pending',
        ordercost: totalCost,
        orderdate: firebase.firestore.FieldValue.serverTimestamp(),
        orderaddress: userdata.address,
        orderphone: userdata.phone,
        ordername: userdata.name,
        orderuseruid: userloggeduid,
        orderpayment: 'online',
        paymenttotal: totalCost
    })
    // navigation.navigate('home');
    alert('Order Placed Successfully');
    // navigation.navigate('trackorders');
  }


  return (
    <ScrollView>
        <TouchableOpacity onPress = {() => navigation.navigate('home')}>
            <View style = {navbtn}>
                <AntDesign name = "back" size = {24} color = "black" style = 
                {navbtnin} />
             </View>
        </TouchableOpacity>
        <View style = {styles.container}>
            <Text style = {styles.head1}> Your Order Summary</Text>
            <FlatList style = {styles.c1} 
                      data = {orderData.cart} 
                      renderItem = {
                        ({item}) => {
                          return (
                              <View style = {styles.rowout}>
                                  <View style = {styles.row}>
                                      <View style = {styles.left}></View>
                                         <Text style = {styles.qty}>{item.Foodquantity} </Text>
                                         <Text style = {styles.title}>{item.data.foodName} </Text>
                                         <Text style = {styles.price1}>{item.data.foodPrice} </Text>
                                      <View style = {styles.right}>
                                          <Text style = {styles.totalprice}>$
                                          {parseInt(item.Foodquantity) * parseInt(item.data.foodPrice)}
                                          </Text>
                                      </View>
                                  </View>

                                  {item.addOnQuantity > 0 && <View style = {styles.row}>
                                      <View style = {styles.left}>
                                          <Text style = {styles.qty}>{item.addOnQuantity}</Text>
                                          <Text style = {styles.title}>{item.data.foodAddOn}</Text>
                                          <Text style = {styles.price1}>{item.data.foodAddOnPrice}</Text>
                                      </View>
                                      <View style = {styles.right}>
                                          <Text style = {styles.totalprice}>
                                              {parseInt(item.addOnQuantity) * 
                                              parseInt(item.data.foodAddonPrice)}
                                          </Text>
                                      </View>
                                  </View>
                                  }
                              </View>
                          )
                        }
            } />

                      <View style = {hr80}></View>

                      <View style = {styles.row}>
                          <View style = {styles.left}>
                              <Text style = {styles.title}> Order Total : </Text>
                          </View>
                          <View style = {styles.left}>
                              <View style = {styles.left}>
                                  <Text style = {styles.totalprice}>${totalCost}</Text>
                              </View>
                          </View>
                      </View>
                      <View style = {hr80}></View>

                      <View style = {styles.userdataout}>
                          <Text style = {styles.head1}>Your Details</Text>
                          <View styles = {styles.row}>
                              <View style = {styles.left}>
                                  <Text style = {styles.title}>Name: </Text>
                              </View>
                              <View style = {styles.right}>
                                  <Text style = {styles.title}>{userdata?.name}</Text>
                              </View>
                      </View>

                      <View style = {styles.row}>
                          <View style = {styles.left}>
                              <Text style = {styles.title}>Email: </Text>
                          </View>
                          <View style = {styles.right}>
                              <Text style = {styles.title}>{userdata?.email}</Text>
                          </View>
                      </View>

                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={styles.title}>Phone :</Text>
                        </View>

                        <View style={styles.right}>
                            <Text style={styles.title}>{userdata?.phone}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={styles.title}>Address :</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.title}>{userdata?.address}</Text>
                        </View>
                    </View>

                    </View>

                    <View style = {hr80}></View>
                    <View>
                        <TouchableOpacity style = {btn1}>
                            <Text style = {styles.btntext} onPress = {() => placenow()}>
                            Proceed to Payment
                            </Text>

                        </TouchableOpacity>
                    </View>
        </View>  
    </ScrollView>
  )
}

export default PlaceOrder

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    head1: {
        fontSize: 30,
        fontWeight: '200',
        color: colors.text1,
        margin: 10,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    rowout: {
      flexDirection: 'column',
      margin: 10,
      elevation: 10,
      backgroundColor: colors.col1,
      padding: 10,
      borderRadius: 10,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qty: {
        width: 40,
        height: 30,
        backgroundColor: colors.text1,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        color: colors.col1,
        fontSize: 17,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
    },
    price1: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
        color: colors.text1,
    },
    totalprice: {
        fontSize: 17,
        fontWeight: 'bold',
        borderColor: colors.text1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.col1,
        margin: 10,
    }
})