import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeStackScreen from './HomeStackScreen'
import AuthNav from '../navigation/AuthNav'
import FavoritesStackScreen from './FavoritesStackScreen'
import NewListingStackScreen from '../screens/NewListingScreen'
import { Context } from '../Context'

const BottomNavBar = ({ route, navigation }) => {
  const { loggedIn, rentee } = useContext(Context)
  const Tab = createBottomTabNavigator()

  return loggedIn ? (
    <NavigationContainer>
      <Tab.Navigator
        options={({ route }) => ({
          title: route.params.name,
        })}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Home') {
              iconName = 'search-outline'
            } else if (route.name === 'New Listing') {
              iconName = 'create-outline'
            } else if (route.name === 'My Listings') {
              iconName = 'heart-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
          headerTitleStyle: {
            color: '#ffffff',
          },
          headerStyle: {
            backgroundColor: 'blue',
          },
        })}
        tabBarOptions={{
          activeTintColor: `#ff1493`,
          inactiveTintColor: 'grey',
          showLabel: false,
        }}
      >
        <Tab.Screen name='Home' component={HomeStackScreen} />
        <Tab.Screen name='My Listings' component={FavoritesStackScreen} />

        {rentee ? (
          <Tab.Screen name='New Listing' component={NewListingStackScreen} />
        ) : null}
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <AuthNav />
  )
}

export default BottomNavBar
