import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed'

  switch (routeName) {
    case 'Login':
      return 'Login'
    case 'Register':
      return 'Register'
  }
}

const AuthNav = ({ route, navigation }) => {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerTitleStyle: {
              color: '#ff1493',
            },
          })}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerTitleStyle: {
              color: '#ff1493',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthNav
