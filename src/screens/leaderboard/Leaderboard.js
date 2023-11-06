import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight, Alert, FlatList } from 'react-native'
import React from 'react'

const Leaderboard = ({navigation}) => {
    return (
        <View style={design.background}>
            <View style={design.header}>
                <ImageBackground source={require('../../../assets/flags.jpg')} resizeMode="cover" style={design.bodyImage} imageStyle={{ opacity: 0.1 }} >
                    <Image source={require("../../../assets/competition.png")} style={design.leaderboardHeaderImage}></Image>
                    <Text style={{ fontSize: 32 }}>BẢNG XẾP HẠNG</Text>
           
                </ImageBackground>
            </View>

            <View style={design.body}>
              <View style={design.bodyContainer}>
              <Text style={{ left: 150, paddingBottom: 20 }}>TÊN</Text>
              <Text style={{ left: 10, bottom: 39 }}>THỨ TỰ</Text>
              <Text style={{ left: 305, bottom: 60 }}>ĐIỂM</Text>
            

      <FlatList
        data={[
          {key: '1                          Devin                                Score'},
          {key: '2                          Dan                                   Score'},
          {key: '3                          Dominic                           Score'},
          {key: '4                          Jackson                           Score'},
          {key: '5                          James                              Score'},
          {key: '6                          Joel                                  Score'},
        ]}
        renderItem={({item}) => <Text style={design.listItem}>{item.key}</Text>}
      />

                </View>
            </View>
{/* 
            <View style = {design.footer}>
              <Navbar/>
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
  
    
  headerButtonImage: {
    width: 22,
    height: 22,

  },
    
  leaderboardHeaderImage: {
    width: 40,
    height: 40,
    alignSelf:'center',
    bottom: 10
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

  bodyContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    bottom: 20,
    
    paddingTop: 80,
    alignContent: 'center'
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
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 200,
    height:80,
    padding: 10, 
    bottom: 120,
    right:90
  },

  button2: {
    alignItems: 'center',
    backgroundColor: '#DAE9FF',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 200,
    height:80,
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
    height:80,
    padding: 10, 
    bottom: 0,
    right:90
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
    alignSelf:'center',

    },

  settingImage: {
    width: 40,
    height: 40,
    alignSelf:'center',

    },
  
  leaderboardImage: {
    width: 40,
    height: 40,
    alignSelf:'center',

    },  
  
        
  //List


  listItem: {
    left: 25,
    fontSize: 16,
    height: 70,
    top: 20
  }, 
  
})

export default Leaderboard