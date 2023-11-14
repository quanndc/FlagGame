import { View, Text,StyleSheet, Image, TouchableHighlight, ImageBackground } from 'react-native'
import React from 'react'
import { signIn } from '../../../utils/Auth';
import SoundPlayer from 'react-native-sound-player';
const SignIn = ({navigation}) => {
  SoundPlayer.playSoundFile('theme', 'mp3')
    // React.useEffect(() => {
    //   const unsubcribe = navigation.addListener('focus', () => {
    //     // SoundPlayer.stop();
    //     SoundPlayer.playSoundFile('theme', 'mp3')
    //   })
    //   return unsubcribe;
    // })

    return (
        <View style={design.background}>
          <View style={design.header}>
            <Image style={design.headerImage} source = {require('../../../assets/logo.png')}></Image>
          </View>
          <View style={design.body}>
            <ImageBackground source={require('../../../assets/flags.jpg')} resizeMode="cover" style={design.bodyImage} imageStyle={{ opacity: 0.1 }}>
    
                <TouchableHighlight 
                underlayCorlor="#DDDDDD"
                activeOpacity={0.9}
                style = {[design.touchable]} onPress={() => {
                    signIn()}} >
    
                  <View style={design.button}>
                      <Text style={design.buttonText}>ĐĂNG NHẬP BẰNG GOOGLE</Text>
                      <Image style={design.googleLogo} source={require('../../../assets/googleLogo.png')} ></Image>
                  </View>
                
                </TouchableHighlight>
    
    
            </ImageBackground>
    
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
      flex: 3,
      padding: 'auto',
  
  
      
    },
  
    headerImage: {
      margin: 110,
      alignSelf: 'center',
      width: 208,
      height: 86.32
    },
      
    //BODY
  
    body:{
      flex: 6,
      backgroundColor: "#FFF",
  
   
  
    },
    bodyImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
    },
  
    //BUTTON
    buttonText: {
      alignItems: 'center',
      top: 15,
      left: 15,
      fontSize: 16,
    },
  
    button: {
      alignItems: 'center',
      width: 280,
      padding: 10, 
      backgroundColor: '#EAEAEA',
      borderRadius: 8,
      
    },
  
    googleLogo: {
      width: 30,
      height: 30,
      right: 110,
      bottom: 10
    },
  
    touchable: {
      bottom: 160,
      borderRadius: 10,
      backgroundColor: 'white',
    }
  
  })

export default SignIn