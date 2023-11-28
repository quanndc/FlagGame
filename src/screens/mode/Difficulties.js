import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight, Alert } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { setMode } from 'react-native-sound'

const DiffSelections = ({ navigation }) => {


  React.useEffect(() => {
    const subscriber = navigation.addListener('focus', () => {
      // SoundPlayer.playSoundFile('theme', 'mp3')
    })
  })
  return (
    <View style={design.background}>
      <View style={design.header}>
        <ImageBackground source={require('../../../assets/flags.jpg')} resizeMode="cover" style={design.bodyImage} imageStyle={{ opacity: 0.1 }} >
          <Image style={design.headerImage} source={require('../../../assets/logo.png')}></Image>

          <TouchableOpacity style={{ right: 150, bottom: 100 }} onPress={() => navigation.navigate("Modes")}>
            <Image style={design.headerButtonImage} source={require('../../../assets/back.png')}></Image>
          </TouchableOpacity>
        </ImageBackground>

      </View>

      <View style={design.body}>
        <View style={design.bodyContainer}>
          <ImageBackground source={require('../../../assets/gaming.png')} resizeMode="cover" style={design.bodyImage} imageStyle={{ opacity: 0.1 }}>
            <TouchableOpacity style={design.button1} onPress={() => Alert.alert("")}>
              <Text style={design.buttonText}>DỄ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={design.button2} onPress={() => Alert.alert("")}>
              <Text style={design.buttonText2}>TRUNG BÌNH</Text>
            </TouchableOpacity>

            <TouchableOpacity style={design.button3} onPress={() => Alert.alert("")}>
              <Text style={design.buttonText}>KHÓ</Text>
            </TouchableOpacity>

          </ImageBackground>

        </View>
      </View>
    </View>
  )
}


const design = new StyleSheet.create({
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

  headerButtonImage: {
    width: 22,
    height: 22,

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
    // borderTopLeftRadius: 12,
    // borderTopRightRadius: 12,
    // bottom: 20,
    // marginBottom: -50,
  },

  //Footer

  footer: {
    // flex: 1,
    // backgroundColor: "#EAEAEA",
    // alignItems: "center",
    // flexDirection: "row",
    // padding: 'auto',
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


})

export default DiffSelections