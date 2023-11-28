import { View, StyleSheet, Text, SafeAreaView, StatusBar, FlatList, Image, TouchableOpacity, Animated, Modal, ImageBackground, LogBox } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getQuestionsByQuizId_2, getQuizById_2, getUserById, updateRank, updateScore, getAllUsers } from '../../../utils/Database'
import { COLORS, SIZES } from '../../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ResultModal from '../../components/PlayScreen/result';
import FormButton from '../../components/shared/FormButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SoundPlayer from 'react-native-sound-player';
// const quizzCollections = await firestore().collection('Quizz').get();r

LogBox.ignoreAllLogs();

const Play = ({ navigation, route }) => {

  const [time, setTime] = useState(10);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // SoundPlayer.stop();
      SoundPlayer.playSoundFile('play', 'mp3')
    })
    if (time != 0) {
      const timeOut = setTimeout(() => {
        setTime(time => time - 1);
      }, 1000);
      console.log(time)
      return () => clearTimeout(timeOut)
    }
    if (time == 0) {
      setIsResultModalVisible(true);
      return;
    }
    return unsubscribe;
  })

  
  const renderClock = () => {
    return (
      <View style={{ widt: '100%', height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {time != 0 ? (
          <Text style={{ fontSize: 40 }}>{time}</Text>
        ) : null}
      </View>
    )
  }




  const playMusic = () => {
    try {
      SoundPlayer.pause();
      SoundPlayer.playSoundFile('finish', 'mp3')
    } catch (e) {

    }
  }






  const [currentUser, setCurrentUser] = useState(route.params.currentUser);
  console.log("log from Play 2" + currentUser.displayName)
  const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
  // const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);



  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0)
  const [showNextButton, setShowNextButton] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)


  const shuffleArray = async array => {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate random number
      let j = Math.floor(Math.random() * (i + 1));

      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };


  const updateScoreBoard = async (newScore) => {
    
    let user = (await getUserById(currentUser.uid)).data();
    console.log(user)
    let quiz = (await getQuizById_2(currentQuizId)).data();
    console.log(quiz)
    if (quiz.title == 'Chế độ dễ' && correctCount >= user.picGuess.easy) {
      await updateScore(currentUser.uid, 
        {...user,
        picGuess:{
          ...user.picGuess,
          easy: correctCount,
          total: user.picGuess.total += correctCount,
        }
      })
    }
    else if(quiz.title == 'Chế độ trung bình' && correctCount >= user.picGuess.medium){
      await updateScore(currentUser.uid, 
        {...user,
        picGuess:{
          ...user.picGuess,
          medium: correctCount,
          total: user.picGuess.total += correctCount,
        }
      })
    }
    else if(quiz.title == 'Chế độ khó' && correctCount >= user.picGuess.hard){
      await updateScore(currentUser.uid, 
        {...user,
        picGuess:{
          ...user.picGuess,
          hard: correctCount,
          total: user.picGuess.total += correctCount,
        }
      })
    }
    else if(quiz.title == 'Chế độ siêu khó' && correctCount >= user.picGuess.veryHard){
      await updateScore(currentUser.uid, 
        {...user,
        picGuess:{
          ...user.picGuess,
          veryHard: correctCount,
          total: user.picGuess.total += correctCount,
        }
      })
    }
    // setCorrectCount(0)
    console.log(correctCount)
  }


  const getQuizAndQuestionDetails = async () => {
    // Get Quiz
    let currentQuiz = (await getQuizById_2(currentQuizId)).data();

    // Get Questions for current quiz
    const questions = await getQuestionsByQuizId_2(currentQuizId);
    // console.log(questions)

    // Transform and shuffle options
    let tempQuestions = [];

    for (let i = 0; i < 10; i++) {
      let question = { ...questions.docs[i].data() };
      // console.log(question)

      question.allOptions = await shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);
      tempQuestions.push(question);
    }
    tempQuestions = await shuffleArray([...tempQuestions]);

    await setQuestions([...tempQuestions]);
    await setCurrentQuestionIndex(0);
  };

  useEffect(() => {
    getQuizAndQuestionDetails();
    const unsubscribe = navigation.addListener('focus', () => {
      SoundPlayer.stop();
      SoundPlayer.playSoundFile('play', 'mp3')
    })
    return unsubscribe;
  }, []);

  const getOptionBgColor = (currentQuestion, currentOption) => {
    if (currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.selectedOption) {
        if (currentOption == currentQuestion.correct_answer) {
          return COLORS.success;
        } else {
          return COLORS.error;
        }
      } else {
        return COLORS.white;
      }
    } else {
      return COLORS.white;
    }
  };

  const getOptionTextColor = (currentQuestion, currentOption) => {
    if (currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.selectedOption) {
        return COLORS.white;
      } else {
        return COLORS.black;
      }
    } else {
      return COLORS.black;
    }
  };


  const validateAnswer = (selectedOption) => {
    let correct_option = questions[currentQuestionIndex]['correct_answer'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set Score
      // setScore(score + 1)
      setCorrectCount(correctCount + 1)
      setShowNextButton(true)

    } else {
      setIncorrectCount(incorrectCount + 1)
      setShowNextButton(true)
    }
    if (currentQuestionIndex == questions.length - 1 && selectedOption == correct_option) {
      setCorrectCount(correctCount + 1)
      setIsResultModalVisible(true)
    }
    if (currentQuestionIndex == questions.length - 1 && selectedOption != correct_option) {
      setIncorrectCount(incorrectCount + 1)
      setIsResultModalVisible(true)
    }
  }
  const handleNext = () => {
    if (currentQuestionIndex == questions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }

  const renderQuestion = () => {
    return (
      <View style={{
        marginTop: 20,
        marginVertical: 40
      }}>


        {/* Question */}
        <View style={{width: '100%', height: 200,backgroundColor: '#A8CBFF', display: "flex", justifyContent: 'center'}}>
          {questions[currentQuestionIndex]?.question !== '' ?
            <Text style={{textAlign: 'center', fontSize: 40, color: 'white'}}>
              {questions[currentQuestionIndex]?.question}
            </Text>  : null }
        </View>
      </View>
    )
  }
  const renderOptions = () => {
    return (
      <SafeAreaView style={{ marginTop: 0 }}>
        <FlatList
          data={questions[currentQuestionIndex]?.allOptions}
          keyExtractor={item => item}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={{ display: 'flex', flexDirection: 'column', flex: 1, margin: 5, alignItems: 'center' }}>
              <TouchableOpacity opacity={0.9}
                onPress={() => validateAnswer(item)}
                disabled={isOptionsDisabled}
                key={item}
                style={[{
                  borderWidth: 3,
                  borderColor: item == correctOption
                    ? COLORS.success
                    : item == currentOptionSelected
                      ? COLORS.error
                      : COLORS.secondary + '40',
                  backgroundColor: item == correctOption
                    ? COLORS.success + '20'
                    : item == currentOptionSelected
                      ? COLORS.error + '20'
                      : COLORS.secondary + '20',
                  height: 60, borderRadius: 20,
                  flexDirection: 'Column',
                  alignItems: 'center', justifyContent: 'center',
                  paddingHorizontal: 20,
                  marginVertical: 10
                }, styles.optionButton]}
              >
                <Image source={{uri: item}} style={{width:'100%', height:100}} />

                {/* {
                  item == correctOption ? (
                    <View style={{
                      width: 30, height: 30, borderRadius: 30 / 2,
                      backgroundColor: COLORS.success,
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      <MaterialCommunityIcons name="check" style={{
                        color: COLORS.white,
                        fontSize: 20
                      }} />
                    </View>
                  ) : item == currentOptionSelected ? (
                    <View style={{
                      width: 30, height: 30, borderRadius: 30 / 2,
                      backgroundColor: COLORS.error,
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      <MaterialCommunityIcons name="close" style={{
                        color: COLORS.white,
                        fontSize: 20
                      }} />
                    </View>
                  ) : null
                } */}



              </TouchableOpacity>
            </View>
          )}
        >

        </FlatList>


        {/* {
                questions[currentQuestionIndex]?.allOptions.map(option => (
                    
                ))
            } */}
      </SafeAreaView>
    )
  }
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <View>
          <TouchableOpacity
            onPress={handleNext}
            style={{
              marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
            }}>
            <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Kế tiếp</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else {
      return null
    }
  }


  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [1, 2],
    outputRange: ['0%', '100%']
  })
  const renderProgressBar = () => {
    return (
      <View style={{
        width: '100%',
        height: 20,
        borderRadius: 5,
        backgroundColor: '#DAE9FF',

      }}>
        <Animated.View style={[{
          position: 'absolute',
          left: 0,
          height: 20,
          borderRadius: 8,
          backgroundColor: '#A8CBFF'

        }, {
          width: progressAnim
        }]}>
          {/* Question Counter */}
        </Animated.View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
          <Text style={{ color: 'white', fontSize: 16, marginRight: 2 }}>{currentQuestionIndex + 1}</Text>
          <Text style={{ color: 'white', fontSize: 16 }}>/ {questions.length}</Text>
        </View>

      </View>
    )
  }


  const getAllUsersFromDB = async () => {
    const users = await getAllUsers()
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

    const [usersTextGuess, setUsersTextGuess] = useState([])
    const [usersPicGuess, setUsersPicGuess] = useState([])

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
    

    // await setAllUsers([...tempUsers])
  }


  const renderModal = () => {
    if (isResultModalVisible == true) {
      playMusic();
      updateScoreBoard(correctCount);
      getAllUsersFromDB();
      // setShowNextButton(false);
      return (
        <View>
          <ResultModal
            isModalVisible={isResultModalVisible}
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            // totalCount={5}

            handleOnClose={() => {
              setIsResultModalVisible(false);
            }}

            handleRetry={() => {
              setCorrectCount(0);
              setIncorrectCount(0);
              setTime(10);
              setCurrentOptionSelected(null);
              getQuizAndQuestionDetails();
              setIsResultModalVisible(false);
              setIsOptionsDisabled(false);
              setShowNextButton(false);
              setProgress(new Animated.Value(0));
              Animated.timing(progress, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false
              }).start();
            }}
            handleHome={() => {
              navigation.goBack();
              setIsResultModalVisible(false);
            }}
          />
        </View>

      )
    }
    else {
      return null;
    }
  }


  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: 'relative',
      }}>

      {/* Status bar */}
      <StatusBar barStyle='dark-content' />

      <ImageBackground source={require('../../../assets/select.png')} opacity={0.35}
        resizeMode='repeat'
        style={styles.background}>

        {/* Progressbar */}
        {renderProgressBar()}
        {/* Question */}
        {renderQuestion()}
         {/* Clock */}
         {renderClock()}
        {/* Options */}
        {renderOptions()}
        {/* Next Button */}
        {renderNextButton()}
        {/* Score Modal */}
        {renderModal()}



      </ImageBackground>



    </SafeAreaView>
  );
};


const styles = new StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  optionButton: {
    width: '99%',
    height: 165,
    display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#DAE9FF',
    textAlign: 'center',
    borderRadius: 8,
  }
})


export default Play


