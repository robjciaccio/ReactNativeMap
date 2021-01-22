import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../Context'
import * as ImagePicker from 'expo-image-picker'
import RadioButtonRN from 'radio-buttons-react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native'

const RegisterScreen = ({ navigation }) => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rentee, setRentee] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { logMeIn, ipAdress } = useContext(Context)

  const createUser = async () => {
    setIsLoading(true)

    let response
    try {
      response = await fetch(`http://${ipAdress}:4001/users/new`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          rentee: rentee,
        }),
      })

      const resData = await response.json()

      logMeIn(resData)

      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const data = [
    {
      label: 'Landlord',
      rentee: true,
    },
    {
      label: 'Tenant',
      rentee: false,
    },
  ]

  return isLoading ? (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>
  ) : (
    <View style={styles.screen}>
      <View style={styles.profileCard}></View>
      <View style={styles.form}>
        <TextInput
          style={{ height: 40 }}
          placeholder='First Name'
          onChangeText={(text) => setFirstName(text)}
          defaultValue={first_name}
        />
      </View>
      <View style={styles.form}>
        <TextInput
          style={{ height: 40 }}
          placeholder='Last Name'
          onChangeText={(text) => setLastName(text)}
          defaultValue={last_name}
        />
      </View>
      <View style={styles.form}>
        <TextInput
          style={{ height: 40 }}
          placeholder='e-mail'
          onChangeText={(text) => setEmail(text)}
          defaultValue={email}
        />
      </View>
      <View style={styles.form}>
        <TextInput
          style={{ height: 40 }}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          defaultValue={password}
        />
      </View>
      <RadioButtonRN
        style={styles.button}
        selectedBtn={(e) => setRentee(e.rentee)}
        data={data}
        icon={<Icon name='check-circle' size={20} color='#2c9dd1' />}
      />

      <Button title='Register' onPress={async () => await createUser()} />

      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text style={styles.loginText}>Already a User? Login instead</Text>

      <Button title='Login' onPress={() => navigation.navigate('Login')} />
    </View>
  )
}

const styles = StyleSheet.create({
  profileCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cirleImage: {
    width: 110,
    height: 110,
    borderRadius: 400 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    padding: 10,
    margin: 15,
    height: 50,
    borderColor: `#dcdcdc`,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
  },
  button: {
    marginTop: 0,
    margin: 15,
  },
  loginText: {
    textAlign: 'center',
  },
})

export default RegisterScreen
