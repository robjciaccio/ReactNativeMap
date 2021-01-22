import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Image, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import RadioButtonRN from 'radio-buttons-react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

const HomeScreen = ({ navigation }) => {
  const [address, setAddress] = useState('')
  const [beds, setBeds] = useState('')
  const [baths, setBaths] = useState('')
  const [price, setPrice] = useState('')

  const data = [
    {
      label: 'Williamsburg',
      rentee: true,
    },
    {
      label: 'GreenPoint',
      rentee: false,
    },
  ]

  const data2 = [
    {
      label: 'Bed-Stuy',
      rentee: true,
    },
    {
      label: 'Bushwick',
      rentee: false,
    },
  ]
  const data3 = [
    {
      label: 'Fort Greene',
      rentee: true,
    },
    {
      label: 'Clinton Hill',
      rentee: false,
    },
  ]

  const data4 = [
    {
      label: 'Park Slope',
      rentee: true,
    },
    {
      label: 'Select All',
      rentee: false,
    },
  ]
  return (
    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.responseBox}>
        <TextInput
          style={{ height: 40 }}
          placeholder='Bedrooms'
          onChangeText={(text) => setBeds(text)}
          defaultValue={beds}
        />
      </View>
      <View style={styles.responseBox}>
        <TextInput
          style={{ height: 40 }}
          placeholder='Bathrooms'
          onChangeText={(text) => setBaths(text)}
          defaultValue={baths}
        />
      </View>
      <View style={styles.responseBox}>
        <TextInput
          style={{ height: 40 }}
          placeholder='Price'
          onChangeText={(text) => setPrice(text)}
          defaultValue={price}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <RadioButtonRN
            style={styles.button}
            selectedBtn={(e) => console.log(e)}
            data={data}
            icon={<Icon name='check-circle' size={20} color='#2c9dd1' />}
          />
          <RadioButtonRN
            style={styles.button}
            selectedBtn={(e) => console.log(e)}
            data={data2}
            icon={<Icon name='check-circle' size={20} color='#2c9dd1' />}
          />
          {/* <Button
            title='Williamsburg'
            onPress={() =>
              navigation.navigate('Search', {
                routeLatitude: '40.71536',
                routeLongitude: '-73.958225',
                routeNeighborhoodName: 'Williamsburg',
              })
            }
          />
          <Button
            title='Bushwick'
            onPress={() => navigation.navigate('Search')}
          /> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 35,
          }}
        >
          <RadioButtonRN
            style={styles.button}
            selectedBtn={(e) => console.log(e)}
            data={data3}
            icon={<Icon name='check-circle' size={20} color='#2c9dd1' />}
          />
          <RadioButtonRN
            style={styles.button}
            selectedBtn={(e) => console.log(e)}
            data={data4}
            icon={<Icon name='check-circle' size={20} color='#2c9dd1' />}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cirleImage: {
    width: 110,
    height: 110,
    borderRadius: 400 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  responseBox: {
    borderWidth: 0.2,
    marginTop: 10,
    width: 90,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingTop: 2,

    height: 45,
    textAlign: 'center',
  },
  button: {
    marginTop: 0,
    margin: 15,
    width: 170,
  },
})

export default HomeScreen
