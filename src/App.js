import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import Home from './screens/home/Home';
import AppNavigator from './navigators/AppNavigator';
import SignIn from './screens/signin/SignIn';
import Play from './screens/play/Play';
import QuizData from './screens/play/QuizData';
import Quiz from './screens/play/Quiz';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onAuthStateChanged = async user => {
    await setCurrentUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);
  if(isLoading){
    return null;
  }

  return (
    <NavigationContainer>
      {/* <QuizData/> */}
      {/* <Play/> */}
      {/* <Quiz/> */}
      {currentUser ? <AppNavigator/> : <SignIn/>}
    </NavigationContainer>
  )
}

export default App
