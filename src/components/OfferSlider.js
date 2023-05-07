import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import {colors} from '../global/styles'


const carouseldata =[
  {
    id:1,
    image: '../../assets/OfferSliderImages/img1.jpg'
  },
  {
    id: 2,
    image: '../../assets/OfferSliderImages/img2.jpg'
  },
  {
    id: 3,
    image: '../../assets/OfferSliderImages/img3.jpg'
  }
]






const OfferSlider = () => {
  return (
    <View>
      <View style = {styles.offerSlider}>
        <Swiper autoplay = {true} autoplayTimeout={5} showsButton={true}
                dotColor = {colors.text2} activeDotColor={colors.text1}
                nextButton = {<Text style={styles.buttonText}></Text>}
                prevButton = {<Text style={styles.buttonText}></Text>}
        >
          <View style = {styles.slide}>
              <Image source={require('../../assets/OfferSliderImages/img1.jpg')}
                style = {styles.image}/>
          </View>
          <View style = {styles.slide}>
              <Image source={require('../../assets/OfferSliderImages/img2.jpg')}
                style = {styles.image}/>
          </View>
          <View style = {styles.slide}>
              <Image source={require('../../assets/OfferSliderImages/img3.jpg')}
                style = {styles.image}/>
          </View>
        </Swiper>
      </View>
    </View>
  )
}

export default OfferSlider

const styles = StyleSheet.create({
  offerSlider: {
    width: '100%',
    height: 200,
    backgroundColor: colors.text3,
    paddingHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  slide: {
    width: '100%',
    height: 200,
    backgroundColor: colors.text3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  buttonText: {
    color: colors.text1,
    fontSize: 50,
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40
  }
})