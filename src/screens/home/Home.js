import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import { createUser, createRank, getUserById } from '../../../utils/Database';
import SoundPlayer from 'react-native-sound-player';

const Home = ({ navigation }) => {

  React.useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      // SoundPlayer.stop();
      SoundPlayer.playSoundFile('theme', 'mp3')
      SoundPlayer.setMixAudio(true);
    })
    return unsubcribe;
  })

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  const create = async () => {
    console.log(currentUser)
    let user = await getUserById(currentUser.uid);
    console.log(user)
    if (user.data() != null || user.data() != undefined) {
      navigation.navigate('Modes', {
        currentUser: currentUser
      });
      // return;
    } 
    if(user.data() === undefined || user.data() === null) {
      await createRank(currentUser.uid, {
        textGuess: {
          rank: 0
        },
        picGuess: {
          rank: 0
        }
      })
      await createUser(currentUser.uid, {
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        textGuess: {
          easy: 0,
          medium: 0,
          hard: 0,
          veryHard: 0,
          total: 0,
          rank: 0
        },
        picGuess: {
          easy: 0,
          medium: 0,
          hard: 0,
          veryHard: 0,
          total: 0,
          rank: 0
        }
      });
      await navigation.navigate('Modes', {
        currentUser: currentUser
      });
    }
  }


  const onAuthStateChanged = async user => {
    await setCurrentUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);


  return (
    <View style={design.background}>
      <View style={design.header}>
        <ImageBackground source={require('../../../assets/flags.jpg')} resizeMode="cover" style={design.bodyImage} imageStyle={{ opacity: 0.1 }} >
          <Image style={design.headerImage} source={require('../../../assets/logo.png')}></Image>
        </ImageBackground>

      </View>

      <View style={design.body}>
        <View style={design.bodyContainer}>
          <ImageBackground source={require('../../../assets/gaming.png')} resizeMode="cover" style={design.bodyImage} imageStyle={{ opacity: 0.1 }}>
            <TouchableOpacity style={design.button1} onPress={() => { create() }}>
              <ImageBackground source={require('../../../assets/gaming.png')} resizeMode="cover" style={design.buttonBackImage} imageStyle={{ opacity: 0.3 }}>

              </ImageBackground>
              <Text style={design.buttonText}>CHƠI NGAY</Text>
              <Image source={require("../../../assets/play.png")} style={design.buttonIcon}></Image>

            </TouchableOpacity>

            <TouchableOpacity style={design.button2} onPress={() => navigation.navigate('Leaderboard')}>
              <ImageBackground source={require('../../../assets/rank.png')} resizeMode="cover" style={design.buttonBackImage2} imageStyle={{ opacity: 0.3 }}>

              </ImageBackground>
              <Text style={design.buttonText2}>BẢNG XẾP HẠNG</Text>
              <Image source={require("../../../assets/competition.png")} style={design.buttonIcon2}></Image>

            </TouchableOpacity>


            <TouchableOpacity style={design.button3} onPress={() => navigation.navigate('Setting', {
              currentUser: currentUser
            })}>
              <ImageBackground source={require('../../../assets/setting.png')} resizeMode="cover" style={design.buttonBackImage3} imageStyle={{ opacity: 0.3 }}>

              </ImageBackground>
              <Text style={design.buttonText}>THIẾT LẬP</Text>
              <Image source={require("../../../assets/settings.png")} style={design.buttonIcon3}></Image>

            </TouchableOpacity>

          </ImageBackground>

        </View>
      </View>


      {/* <View style = {design.footer}>

            </View> */}

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
    alignContent: "center",
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
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 200,
    height: 80,
    padding: 10,
    bottom: 120,
    right: 90
  },

  button2: {
    alignItems: 'center',
    backgroundColor: '#DAE9FF',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 200,
    height: 80,
    padding: 10,
    margin: 40,
    bottom: 70,
    left: 90
  },


  button3: {
    alignItems: 'center',
    backgroundColor: '#DAE9FF',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 200,
    height: 80,
    padding: 10,
    bottom: 0,
    right: 90
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


})

export default Home