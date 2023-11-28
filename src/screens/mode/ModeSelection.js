import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight, Alert } from 'react-native'
import React,{useState} from 'react'
import { TouchableOpacity } from 'react-native'

const ModeSelect = ({ navigation, route }) => {
  const [currentUser, setCurrentUser] = useState(route.params.currentUser);
  // console.log("log from Mode" + currentUser.displayName)
  return (
    <View style={design.background}>
      <View style={design.header}>
        <ImageBackground source={require('../../../assets/flags.jpg')} resizeMode="cover" style={design.bodyImage} imageStyle={{ opacity: 0.1 }} >
          {/* <TouchableHighlight style={{ right: 150}} onPress={() => Alert.alert("")}>
                      <Image style={design.headerButton} source = {require('../../../assets/back.png')}></Image> 
                    </TouchableHighlight> */}

          <Image style={design.headerImage} source={require('../../../assets/logo.png')}></Image>
        </ImageBackground>

      </View>

      <View style={design.body}>
        <View style={design.bodyContainer}>
          <ImageBackground source={require('../../../assets/gaming.png')} resizeMode="cover" style={design.bodyImage} imageStyle={{ opacity: 0.1 }}>
            <TouchableOpacity style={design.button1} onPress={() => navigation.navigate('QuizData',{currentUser: currentUser})}>
              <ImageBackground source={require('../../../assets/flags.jpg')} resizeMode="cover" style={design.buttonBackImage} imageStyle={{ opacity: 0.1 }} >
                <Text style={{ fontWeight: 'bold' }}>NHÌN QUỐC KỲ ĐOÁN QUỐC GIA</Text>
                <Text style={{ fontSize: 11 }}>20 CÂU HỎI</Text>
              </ImageBackground>


            </TouchableOpacity>

            <TouchableOpacity style={design.button2} onPress={() => navigation.navigate('QuizData2', {currentUser: currentUser})}>
              <ImageBackground source={require('../../../assets/flags.jpg')} resizeMode="cover" style={design.buttonBackImage} imageStyle={{ opacity: 0.1 }} >
                <Text style={{ fontWeight: 'bold' }}>NHÌN TÊN ĐOÁN QUỐC KỲ</Text>
                <Text style={{ fontSize: 11 }}>20 CÂU HỎI</Text>
              </ImageBackground>


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

  headerButton: {
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
    top: 15,
    left: 10,
    fontSize: 16,
  },

  buttonText2: {
    alignItems: 'center',
    top: 15,
    left: 20,
    fontSize: 16,
  },

  button1: {
    alignItems: 'center',
    backgroundColor: '#DAE9FF',
    borderRadius: 8,
    width: 300,
    height: 200,
    padding: 10,
    bottom: 50,

  },

  button2: {
    alignItems: 'center',
    backgroundColor: '#DAE9FF',
    borderRadius: 8,
    width: 300,
    height: 200,
    padding: 10,
    margin: 40,
    top: 40,

  },





  buttonBackImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    width: 300,
    height: 190

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

export default ModeSelect