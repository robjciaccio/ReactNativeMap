import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FavoritesScreen from '../screens/FavoritesScreen'

const FavoriteStack = createStackNavigator()

const FavoritesStackScreen = () => {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen
        name='My Listings'
        component={FavoritesScreen}
        options={{
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: 'blue',
          },
        }}
      />
    </FavoriteStack.Navigator>
  )
}

export default FavoritesStackScreen
