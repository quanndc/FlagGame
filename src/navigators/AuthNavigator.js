import { createStackNavigator } from '@react-navigation/stack';
import  SignIn  from '../screens/signin/SignIn';
import  Home  from '../screens/home/Home';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;