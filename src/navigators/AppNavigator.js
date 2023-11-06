import { createStackNavigator } from '@react-navigation/stack';
import  Home  from '../screens/home/Home';
import Leaderboard from '../screens/leaderboard/Leaderboard';
import Setting from '../screens/setting/Setting';
import ModeSelect from '../screens/mode/ModeSelection';
import DiffSelections from '../screens/mode/Difficulties';
import QuizData from '../screens/play/QuizData';
import Play from '../screens/play/Play';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
      {/* <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Leaderboard" component={Leaderboard}/>
      <Stack.Screen name="Setting" component={Setting}/>
      <Stack.Screen name="Modes" component={ModeSelect}/>
      <Stack.Screen name="Difficulty" component={DiffSelections}/> */}
      <Stack.Screen name="QuizDatAa" component={QuizData}/>
      <Stack.Screen name="Play" component={Play}/>

      
    </Stack.Navigator>
  );
}

export default AppNavigator;