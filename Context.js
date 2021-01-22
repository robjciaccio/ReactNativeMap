import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Context = React.createContext()

const ContextProvider = ({ children }) => {
  const [user_id, setUser_id] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [rentee, setRentee] = useState(false)
  const ipAdress = '192.168.1.106'

  // 192.168.0.135 downstairs
  // 192.168.1.106 upstairs

  const logMeIn = async (resData) => {
    console.log(resData[0])
    setUser_id(resData[0].id)
    setFirstName(resData[0].first_name)
    setLastName(resData[0].last_name)
    setEmail(resData[0].email)
    setPassword(resData[0].password)
    setRentee(resData[0].rentee)
    jsonData = JSON.stringify(resData)
    await AsyncStorage.setItem('userData', jsonData)
    setLoggedIn(true)
  }

  const logInCurrent = async (resData) => {
    console.log(resData.id, 34)
    setUser_id(resData.id)
    setFirstName(resData.first_name)
    setLastName(resData.last_name)
    setEmail(resData.email)
    setPassword(resData.password)
    setRentee(resData.rentee)
    jsonData = JSON.stringify(resData)

    await AsyncStorage.setItem('userData', jsonData)
    setLoggedIn(true)
  }

  const logOut = async () => {
    setLoggedIn(false)
    setUser_id('')
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    await AsyncStorage.clear()
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const loggedInUser = await AsyncStorage.getItem('userData')
        console.log(loggedInUser)
        return loggedInUser != null ? JSON.parse(loggedInUser) : null
      } catch (error) {
        console.log('context line 34')
      }

      if (loggedInUser) {
        logMeIn(loggedInUser.resData)
      }
    }
    getData()
  }, [])

  return (
    <Context.Provider
      value={{
        logMeIn,
        logInCurrent,
        ipAdress,
        loggedIn,
        rentee,
        logOut,
        user_id,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
