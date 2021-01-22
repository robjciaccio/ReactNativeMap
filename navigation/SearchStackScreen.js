import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchScreen from '../screens/SearchScreen'

const SearchStack = createStackNavigator()

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name='Search'
        component={SearchScreen}
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
    </SearchStack.Navigator>
  )
}

export default SearchStackScreen
