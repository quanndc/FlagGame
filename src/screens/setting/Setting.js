import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight, Alert } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { TouchableOpacity } from 'react-native'


const Setting = ({ navigation }) => {
  return (
    <View style={design.background}>
      <View style={design.header}>
        <ImageBackground source={require('../../../assets/flags.jpg')} resizeMode="cover" style={design.bodyImage} imageStyle={{ opacity: 0.1 }} >

        </ImageBackground>
      </View>

      <View style={design.body}>
        <Image
          style={design.img}
          source={{
            uri: "https://flagsapi.com/VN/flat/64.png",
          }}

        />
        {/* <View style={design.bodyContainer}>
          <Text style={{ alignItems: 'center', top: 150, left: 80, fontWeight: 'bold' }}>ÂM THANH</Text>

          <View style={design.volumeButton}>
            <TouchableHighlight style={{ height: 80, width: 75 }} onPress={() => console.log("Pressed")}>
              <Image style={design.volumeImage} source={require('../../../assets/volume.png')}></Image>
            </TouchableHighlight>

            <TouchableHighlight style={{ height: 80, width: 75, left: 75, bottom: 80 }} onPress={() => console.log("Pressed")}>
              <Image style={design.volumeImage} source={require('../../../assets/silent.png')}></Image>
            </TouchableHighlight>

          </View>

        </View> */}
      </View>





    </View>

  )
}

const design = new StyleSheet.create({
  img: {
    width: 200,
    height: 200
  },


  background: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },

  //HEADER
  header: {
    backgroundColor: "#B4D2FF",
    flex: 2,
    padding: 'auto',

  },


  //BODY

  body: {
    flex: 6,
    backgroundColor: "#FFF",


  },
  bodyImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    bottom: 20,
    marginBottom: -50,
  },

  //Footer

  footer: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    alignItems: "center",
    flexDirection: "row",
    padding: 'auto',
  },


  //BUTTON
  buttonText: {
    alignItems: 'center',
    top: 18,
    left: 0,
    fontSize: 16,
  },

  buttonText2: {
    alignItems: 'center',
    top: 15,
    left: 0,
    fontSize: 16,
  },

  button1: {
    alignItems: 'center',
    backgroundColor: '#DAE9FF',
    borderRadius: 8,
    width: 200,
    height: 80,
    padding: 10,
    bottom: 100,
    right: 0
  },

  button2: {
    alignItems: 'center',
    backgroundColor: '#DAE9FF',
    borderRadius: 8,
    width: 200,
    height: 80,
    padding: 10,
    margin: 40,
    bottom: 50,
    left: 0
  },


  button3: {
    alignItems: 'center',
    backgroundColor: '#DAE9FF',
    borderRadius: 8,
    width: 200,
    height: 80,
    padding: 10,
    bottom: 0,
    right: 0
  },


  buttonBackImage: {
    flex: 2,
    width: 200,
    height: 70

  },

  buttonBackImage2: {
    flex: 2,
    width: 200,
    height: 70,

  },

  buttonBackImage3: {
    flex: 2,
    width: 200,
    height: 70

  },

  buttonIcon: {
    width: 30,
    height: 30,
    alignSelf: 'flex-start',
    bottom: 10,
    left: 10,
  },

  buttonIcon2: {
    width: 30,
    height: 30,
    alignSelf: 'flex-start',
    bottom: 13,
    left: 10,
  },

  buttonIcon3: {
    width: 30,
    height: 30,
    alignSelf: 'flex-start',
    bottom: 10,
    left: 10,
  },


  //NAV
  homeImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',

  },


  settingImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',

  },

  leaderboardImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',

  },


  volumeImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    top: 20,
    right: 0
  },

  volumeButton: {
    backgroundColor: '#EAEAEA',
    width: 150,
    height: 80,
    left: 180,
    top: 100,
    borderRadius: 8,
  }

})

export default Setting