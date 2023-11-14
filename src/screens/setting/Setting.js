import { StyleSheet, View, Text, StatusBar, Image, ImageBackground, TouchableHighlight, Alert, Button, Dimensions } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { signOut } from '../../../utils/Auth'
import { getUserById, getRankById } from '../../../utils/Database'

const Setting = ({ navigation, route }) => {
  const { currentUser } = route.params;

  const [currentScoreText, setCurrentScoreText] = useState(0);
  const [currentScorePic, setCurrentScorePic] = useState(0);
  const [currentRankText, setCurrentRankText] = useState(0);
  const [currentRankPic, setCurrentRankPic] = useState(0);

  const getScoreAndRank = async () => {
    const user = await getUserById(currentUser.uid);
    const scoreText = user.data().textGuess.total;
    setCurrentScoreText(scoreText);
    const scorePic = user.data().picGuess.total;
    setCurrentScorePic(scorePic);

    const rank  = await getRankById(currentUser.uid);
    const rankText = rank.data().textGuess.rank;
    setCurrentRankText(rankText);
    const rankPic = rank.data().picGuess.rank;
    setCurrentRankPic(rankPic);
  }

  useEffect(() => {
    getScoreAndRank();
  })

  // console.log(currentUser.uid)
  // const lastSignInTime = new Date(currentUser.metadata.lastSignInTime).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
  return (

    <View style={design.background}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />


      <View style={design.header}>
        <View style={design.signOutHolder}>
          <TouchableOpacity style={design.signOutContent} onPress={() => {
            signOut()
          }}>
            <Image source={require('../../../assets/logout.png')} style={design.signOutIcon}/>
            <Text style={{ color: '#5A9DFF', fontSize: 15, fontWeight: 'bold' }}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
        <View style={design.avatarHolder}>
          <Image
            style={design.avatar}
            source={{ uri: currentUser.photoURL }} resizeMode='cover'  />
        </View>
      </View>

      <View style={design.body}>

        <View style={design.profile}>
          <Text style={{ color: 'black', fontSize: 30, textAlign: 'center', fontWeight: 600 }}>
            {currentUser.displayName}
          </Text>
          <Text style={{ color: 'black', textAlign: 'center', fontWeight: 200, fontSize: 13 }}>
            {currentUser.email}
          </Text>
        </View>

        <View style={design.score}>
          <View style={design.scoreHeader}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Score
            </Text>
          </View>

          <View style={design.scoreBody}>
            <View style={design.scoreBodyContent}>
              <View style={design.scoreBodyContentTop}>
                <Text style={design.content1}>
                  Nhìn quốc kỳ đoán tên quốc gia
                </Text>
              </View>
              <View style={design.scoreBodyContentBottom}>
                <Text style={design.content2}>
                  Điểm cao nhất: {currentScoreText}
                </Text>
                <Text style={design.content2}>
                  Hạng: {currentRankText}
                </Text>
              </View>

            </View>

            <View style={design.scoreBodyContent}>
              <View style={design.scoreBodyContentTop}>
                <Text style={design.content1}>
                  Nhìn tên quốc gia đoán quốc kỳ
                </Text>
              </View>
              <View style={design.scoreBodyContentBottom}>
                <Text style={design.content2}>
                  Điểm cao nhất: {currentScorePic}
                </Text>
                <Text style={design.content2}>
                  Hạng: {currentRankPic}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>

  )
}

const design = new StyleSheet.create({
  background: {
    backgroundColor: 'white',
    // flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },

  //HEADER
  header: {
    // backgroundColor: "#000",
    // flex: 1,
    // padding: 'auto',
    width: '100%',
    height: '31%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },

  avatar: {
    aspectRatio: 1,
    width: 160,
    height: 160,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },

  body: {
    width: '100%',
    height: '55%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 25,
  },

  profile: {
    width: '100%',
    height: '15%',
    display: 'flex',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },

  score: {
    width: '90%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#DAE9FF',
    justifyContent: 'space-around',

  },
  scoreHeader: {
    width: '85%',
    height: '10%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  scoreBody: {
    width: '90%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scoreBodyContent: {
    width: '100%',
    height: '40%',
    borderRadius: 20,
    backgroundColor: 'yellow',
    borderRadius: 20,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
    
  },
  scoreBodyContentTop: {
    width: '90%',
    height: '40%',
    display: 'flex',
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },
  scoreBodyContentBottom: {
    width: '90%',
    height: '40%',
    display: 'flex',
    flexDirection: 'row',
    gap: 50,
    display: 'flex',
    alignItems: 'center',
  },

  content1:{
    fontSize: 19,
    fontWeight: 'bold',
  },
  content2:{
    fontSize: 17,
    // fontWeight: 'bold',
  },

  signOutHolder:{
    width:'90%',
    height: '20%',
  },
  signOutContent:{
    width: '30%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    backgroundColor: '#DAE9FF',
    alignSelf: 'flex-end',
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
  },
  signOutIcon:{
    width: 15,
    height: 15,
  }
})

export default Setting