import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NewListingScreen from '../screens/NewListingScreen'

const NewListingStack = createStackNavigator()

const NewListingStackScreen = () => {
  return (
    <NewListingStack.Navigator>
      <NewListingStack.Screen
        name='New Listing'
        component={NewListingScreen}
        options={{
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: 'blue',
          },
        }}
      ></NewListingStack.Screen>
    </NewListingStack.Navigator>
  )
}

export default NewListingStackScreen
