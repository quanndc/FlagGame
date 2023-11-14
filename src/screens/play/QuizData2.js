import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { signOut } from '../../../utils/Auth';
import FormButton from '../../components/shared/FormButton';
import { COLORS } from '../../constants/theme';
import { getQuizzes_2 } from '../../../utils/Database';
import SoundPlayer from 'react-native-sound-player';

const imgURL = { uri: '../../../assets/select.png' };
const QuizData = ({ navigation, route }) => {
  const [currentUser, setCurrentUser] = useState(route.params.currentUser);
  console.log("log from QuizData 2" + currentUser.displayName)
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllQuizzes = async () => {
    setRefreshing(true);
    const quizzes = await getQuizzes_2();
    // console.log(quizzes)
    // Transform quiz data
    let tempQuizzes = [];
    await quizzes.docs.forEach(async quiz => {
      // console.log(quiz.data())
      await tempQuizzes.push({ id: quiz.id, ...quiz.data() });
    });
    await setAllQuizzes([...tempQuizzes]);

    setRefreshing(false);
  };

  useEffect(() => {
    getAllQuizzes();
    const unsubcribe = navigation.addListener('focus', () => {
      SoundPlayer.stop();
      SoundPlayer.playSoundFile('theme', 'mp3')
    })
    return unsubcribe;

  }, []);

  return (

    <SafeAreaView style={design.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

      <ImageBackground source={require('../../../assets/select.png')} resizeMode='repeat' opacity={0.75}
        style={design.background}>


        <FlatList
          data={allQuizzes}
          onRefresh={getAllQuizzes}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          style={{
            paddingVertical: 20,
          }}
          renderItem={({ item: quiz }) => (
            <View
              style={{
                padding: 20,
                borderRadius: 8,
                marginVertical: 5,
                marginHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#DAE9FF',
                elevation: 2,
              }}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={{ fontSize: 18, color: COLORS.black }}>
                  {quiz.title}
                </Text>
                {quiz.description != '' ? (
                  <Text style={{ opacity: 0.5 }}>{quiz.description}</Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 50,
                  backgroundColor: '#A8CBFF',
                }}
                onPress={() => {
                  // console.log(quiz.id)
                  navigation.navigate('Play2', {
                    quizId: quiz.id,
                    currentUser: currentUser,
                  });
                }}>
                <Text style={{ color: 'black' }}>Chơi</Text>
              </TouchableOpacity>
            </View>
          )}
        />


      </ImageBackground>
    </SafeAreaView>
    // <SafeAreaView
    //   style={{
    //     flex: 1,
    //     backgroundColor: '#white',
    //     position: 'relative',
    //   }}>
    //   {/* Quiz list */}


    //   {/* Button */}
    // </SafeAreaView>
  );
};

const design = new StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    // flex: 2,
    width: '100%',
    height: '100%',

  }
})


export default QuizData;

