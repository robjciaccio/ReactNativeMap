import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native'

import { Context } from '../Context'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { logInCurrent, ipAdress } = useContext(Context)

  const loginUser = async () => {
    setIsLoading(true)
    const respone = await fetch(`http://${ipAdress}:4001/users/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })

    const resData = await respone.json()

    if (!resData) {
      console.log('No')
    }
    logInCurrent(resData)
    setIsLoading(false)
  }
  return isLoading ? (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>
  ) : (
    <View style={styles.screen}>
      <View style={styles.form}>
        <TextInput
          style={{ height: 40 }}
          placeholder='email'
          onChangeText={(text) => setEmail(text)}
          defaultValue={email}
        />
      </View>
      <View style={styles.form}>
        <TextInput
          secureTextEntry={true}
          style={styles.default}
          style={{ height: 40 }}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          defaultValue={password}
        />
      </View>
      <View style={{ paddingBottom: 40 }}>
        <Button title='Log In' onPress={() => loginUser()} />
      </View>

      <View style={{ paddingTop: 40, alignItems: 'center' }}>
        <Text>Don't Have a Login?</Text>
        <Button
          title='Register'
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    padding: 10,
    margin: 15,
    height: 40,
    borderColor: `#add8e6`,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
})

export default LoginScreen
