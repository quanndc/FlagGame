import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight, Alert, FlatList, StatusBar, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../../constants/theme'
import { getAllUsers, createRank } from '../../../utils/Database'
// import SelectDropdown from 'react-native-select-dropdown'
// import { Dropdown } from 'react-native-element-dropdown';
import { SelectList } from 'react-native-dropdown-select-list'
const Leaderboard = ({ navigation }) => {

  // const [allUsers, setAllUsers] = useState([])
  const [usersTextGuess, setUsersTextGuess] = useState([])
  const [usersPicGuess, setUsersPicGuess] = useState([])
  const [refreshing, setRefreshing] = useState(false);


  const bubbleSort = (array) => {
    let isOrdered;
    for (let i = 0; i < array.length; i++) {
      isOrdered = true;
      for (let x = 0; x < array.length - 1 - i; x++) {
        if (array[x].score > array[x + 1].score) {
          [array[x], array[x + 1]] = [array[x + 1], array[x]];
          isOrdered = false;
        }
      }
      if (isOrdered) break;
    }
    return array;
  }

  const getAllUsersFromDB = async () => {
    const users = await getAllUsers()
    setRefreshing(true);
    // setUsersPicGuess([])
    // setUsersTextGuess([])
    // setAllUsers(users)


    let tempUsersTextGuess = [];
    let tempUsersPicGuess = [];
    await users.docs.forEach(async user => {
      // console.log(user.data())
      await tempUsersTextGuess.push({
        id: user.id,
        displayName: user.data().displayName,
        photoURL: user.data().photoURL,
        score: user.data().textGuess.total,
      })
      await tempUsersPicGuess.push({
        id: user.id,
        displayName: user.data().displayName,
        photoURL: user.data().photoURL,
        score: user.data().picGuess.total,
      })
    });
    tempUsersTextGuess =  await bubbleSort([...tempUsersTextGuess])
    tempUsersPicGuess =  await bubbleSort([...tempUsersPicGuess])

    tempUsersPicGuess = tempUsersPicGuess.reverse()
    tempUsersTextGuess = tempUsersTextGuess.reverse()
    await setUsersTextGuess([...tempUsersTextGuess])

    await setUsersPicGuess([...tempUsersPicGuess])

    tempUsersPicGuess.forEach((user, index) => {
      createRank(user.id, { picGuess: { rank: index + 1 } })
    })
    tempUsersTextGuess.forEach((user, index) => {
      createRank(user.id, { textGuess: { rank: index + 1 } })
    })

    setRefreshing(false);
    

    // await setAllUsers([...tempUsers])
  }

  useEffect(() => {
    getAllUsersFromDB()
  }, [])

  const countries = ['Nhìn quốc kỳ đoán tên quốc gia', 'Nhìn tên quốc gia đoán quốc kỳ']
  // const [data, setData] = useState([1, 2, 3, 4, 5, 6])
  // const [data2, setData2] = useState(['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p'])
  const renderData = ({ item }) => {
    return (
      <SafeAreaView>
        {item == 'Nhìn quốc kỳ đoán tên quốc gia' || item == '' ? (
          <FlatList
            data={usersTextGuess}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            style={{
              display: 'flex',
              flexDirection: 'column',
              // paddingVertical: 20,
            }}
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            renderItem={({ item: user, index }) => (
              <View
                style={{
                  width: '95%',
                  padding: 15,
                  height: 90,
                  borderRadius: 8,
                  marginVertical: 10,
                  // marginHorizontal: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#DAE9FF',
                  elevation: 2,
                }}>
                <View
                  key={user.id}
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '130%' }}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '30%', height: '100%'}}>
                    <Text style={{ fontSize: 20 }}>{index + 1}</Text>
                    <Image source={{ uri: user.photoURL }} style={{ width: 45, height: 45, borderRadius: 100 }} />
                  </View>
                  <View style={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <View style={{ width: '100%', height: '45%', display: 'flex', flexDirection:'row',alignItems: 'flex-end'}}>
                      <Text style={{fontSize: 17}}>{user.displayName}</Text>
                    </View>
                    <View style={{ width: '100%', height: '45%'}}>
                      <Text style={{fontSize: 15}}>Tổng điểm:  {user.score}</Text>
                    </View>
                  </View>
                </View>

              </View>
            )}
          />
        ) : (
          <FlatList
            data={usersPicGuess}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            style={{
              display: 'flex',
              flexDirection: 'column',
              // paddingVertical: 20,
            }}
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            renderItem={({ item: user, index }) => (
              <View
                style={{
                  width: '95%',
                  padding: 15,
                  height: 90,
                  borderRadius: 8,
                  marginVertical: 10,
                  // marginHorizontal: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#DAE9FF',
                  elevation: 2,
                }}>
                <View
                  key={user.id}
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '130%' }}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '30%', height: '100%'}}>
                    <Text style={{ fontSize: 20 }}>{index + 1}</Text>
                    <Image source={{ uri: user.photoURL }} style={{ width: 45, height: 45, borderRadius: 100 }} />
                  </View>
                  <View style={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <View style={{ width: '100%', height: '45%', display: 'flex', flexDirection:'row',alignItems: 'flex-end'}}>
                      <Text style={{fontSize: 17}}>{user.displayName}</Text>
                    </View>
                    <View style={{ width: '100%', height: '45%'}}>
                      <Text style={{fontSize: 15}}>Tổng điểm:  {user.score}</Text>
                    </View>
                  </View>
                </View>

              </View>
            )}
          />
        )}
      </SafeAreaView>
    )
  };



  const [selectedValue, setSelectedValue] = useState("");
  console.log(selectedValue)

  return (
    <View style={design.background}>
      <StatusBar barStyle='dark-content' />

      <View style={design.header}>
        <ImageBackground source={require('../../../assets/flags.jpg')} resizeMode="cover" style={design.bodyImage} imageStyle={{ opacity: 0.1 }} >
          <Image source={require("../../../assets/competition.png")} style={design.leaderboardHeaderImage}></Image>
          <Text style={{ fontSize: 32 }}>BẢNG XẾP HẠNG</Text>

        </ImageBackground>
      </View>

      <View style={design.body}>
        <View style={design.bodyContainer}>
          <SelectList
            data={countries} setSelected={setSelectedValue}
            boxStyles={{ borderColor: 'gray', borderRadius: 0, marginHorizontal: 10, borderRadius: 5, marginVertical: 10 }}
            dropdownStyles={{ borderRadius: 0, marginHorizontal: 10, borderRadius: 5 }}
            search={false}
            defaultSelected={countries[0]}

            placeholder='Nhìn quốc kỳ đoán tên quốc gia' />


          {renderData({ item: selectedValue })}

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
  dropdown: {
    // margin: 16,
    // height: 50,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 0.5,
    // backgroundColor: 'red',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'red',
  },
  selectedTextStyle: {
    fontSize: 16,
    alignItems: 'f'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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

  //dropdown
  dropdown: {
    width: '100%',
  },

  headerButtonImage: {
    width: 22,
    height: 22,

  },

  leaderboardHeaderImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    bottom: 10
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
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '90%',
    // backgroundColor: "#FFF",
    // borderTopLeftRadius: 12,
    // borderTopRightRadius: 12,
    // bottom: 20,

    // paddingTop: 80,
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


  //List


  listItem: {
    left: 25,
    fontSize: 16,
    height: 70,
    top: 20
  },

})

export default Leaderboard