import { StyleSheet, View, Text, StatusBar, TextInput, ScrollView, FlatList } from 'react-native'
import React, {useEffect,useState} from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'
import { AntDesign } from '@expo/vector-icons'
import { colors, veg, nonveg } from '../global/styles'
import CardSlider from '../components/CardSlider'
import ButtonNav from '../components/ButtonNav'

import { firebase } from '../../Firebase/firebaseConfig'


const HomeScreen = ({navigation}) => {
  const [foodData, setFoodData] = useState([]);
  const [VegData, setVegData] = useState([]);
  const[NonVegData, setNonVegData] = useState([]);

  const foodRef = firebase.firestore().collection("FoodData");

  useEffect (() => {
      foodRef.onSnapshot(snapshot => {
        setFoodData(snapshot.docs.map(doc => doc.data()))
      })
  },[])

  useEffect(() => {
    setVegData(foodData.filter(item => item.foodType == 'veg'))
    setNonVegData(foodData.filter(item => item.foodType == 'non-veg'))
  }, [foodData])

  //console.log(VegData)
  //console.log(foodData)

  const [search, setSearch] = useState('')
  //console.log(search)

  return (
    <View style = {styles.container}>
      <StatusBar />
      <HomeHeadNav navigation = {navigation}/>
      
      <View style = {styles.bottomnav}>
          <ButtonNav navigation = {navigation}/>
      </View>

      <ScrollView>
      <View style = {styles.searchbox}>
          <AntDesign name="search1" size={24} color="black" style = {styles.searchicon}/>
          <TextInput placeholder = 'search' onChangeText={(text) => {setSearch(text)}} />
      </View>
      {search != '' && <View style = {styles.searchresultsouter}>
        {/* <Text>You Typed Something :(</Text> */}
        <FlatList style = {styles.searchresultsinner}
                  data = {foodData}
                  renderItem = {({item}) => {
                      if (item.foodName.toLowerCase().includes(search.toLowerCase())) {
                          return (
                              <View style = {styles.searchresult}>
                                  <AntDesign name = "arrowright" size = {24} color = "black"/>


                                  <Text style = {styles.searchresulttext}>{item.foodName} </Text>
                              </View>
                          )
                      }
                  }}
        />
      </View>}
      <Categories />
      <OfferSlider />

      {/* <Text>HomeScreen</Text> */}
      <CardSlider title = {"Today's Special"} data = {foodData} navigation = {navigation} />
      <CardSlider title = {"NonVeg"} data = {NonVegData} navigation = {navigation}/>
      <CardSlider title = {"Veg Grind"} data = {VegData} navigation = {navigation}/>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
    flex: 1,
    backgroundColor: colors.col1,
    //alignItems: 'center',
    width: '100%'
  },
  searchbox: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: colors.col1,
    borderRadius: 30,
    alignItems: 'center',
    padding: 10,
    margin: 20,
    elevation: 10
  },
  input: {
    marginLeft: 10,
    width: '90%',
    fontSize: 18,
    color: colors.text1
  },
  searchicon: {
    color: colors.text1
  },

  searchresultsouter: {
    width: '100%',
    marginHorizontal: 30,
    // height: '100%',
    backgroundColor: colors.col1,
  },
  searchresultsinner: {
    width: '100%',
  },

  searchresulttext: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.text1,
},

  searchresult: {
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
    padding: 5,
  },

  searchresulttext: {
    marginLeft: 10,
    fontSize: 10,
    color: colors.text1,
  },
  bottomnav: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: colors.col1,
      zIndex: 20,
  }
})
export default HomeScreen