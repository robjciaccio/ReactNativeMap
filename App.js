import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BottomNavBar from './navigation/BottomNavBar'
import RegisterScreen from './screens/RegisterScreen'

import { ContextProvider } from './Context'

export default function App() {
  return (
    <ContextProvider>
      <BottomNavBar />
    </ContextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
