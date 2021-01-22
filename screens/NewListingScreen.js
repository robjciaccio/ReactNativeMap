import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Button, Image, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Context } from '../Context'

const NewListingScreen = ({ navigation }) => {
  const [image, setImage] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [ontoImage, setOntoImage] = useState(false)
  const [neighborhood, setNeighborhood] = useState('')
  const [address, setAddress] = useState('')
  const [apt, setApt] = useState('')
  const [beds, setBeds] = useState('')
  const [baths, setBaths] = useState('')
  const [price, setPrice] = useState('')
  const [listing_id, setListing_id] = useState('')

  const { ipAdress, user_id } = useContext(Context)

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const createListing = async () => {
    const response = await fetch(`http://${ipAdress}:4001/listings/new`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        neighborhood: neighborhood,
        address: address,
        apt: apt,
        beds: beds,
        baths: baths,
        price: price,
        user_id: user_id,
      }),
    })
    const resData = await response.json()
    setListing_id(resData[0].id)
  }

  const addImage = async () => {
    let localUri = image.uri
    let filename = localUri.split('/').pop()

    let match = /\.(\w+)$/.exec(filename)
    let type = match ? `image/${match[1]}` : `image`

    try {
      const formData = new FormData()
      formData.append('image', { uri: localUri, name: filename })
      formData.append('listing_id', listing_id)
      formData.append('image_uri', image.uri)

      const response = await fetch(`http://${ipAdress}:4001/image/new`, {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })

      const resData = await response.json()
      console.log(resData)
    } catch (error) {
      console.log(error)
    }
  }

  handlePress = () => {
    addImage()
    setLatitude('')
    setLongitude('')
    setNeighborhood('')
    setAddress('')
    setApt('')
    setBeds('')
    setBaths('')
    setPrice('')
    setImage('')
    setOntoImage(false)
    navigation.navigate('My Listings')
  }

  console.log(listing_id)

  const handleClick = () => {
    setOntoImage(true)
    createListing()
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,

      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)
    result ? setImage(result) : setImage(null)
  }
  return ontoImage ? (
    <View style={styles.screen}>
      {image ? (
        <View>
          <Image source={{ uri: image.uri }} style={styles.cirleImage} />
        </View>
      ) : null}
      <View>
        <Text style={styles.words}>
          Now, Lets select an Image for this Listing
        </Text>
      </View>
      <Button title='Select Image' onPress={() => pickImage()} />
      {image ? (
        <Button title='upload Image' onPress={() => handlePress()} />
      ) : null}
    </View>
  ) : (
    <View style={styles.screen}>
      <Text style={styles.words}>
        Lets Set Up your Listing, Fill out the fields below
      </Text>

      <View style={{ marginTop: 40 }}>
        <View style={styles.responseBox}>
          <TextInput
            style={{ height: 40 }}
            placeholder='Latitude'
            onChangeText={(text) => setLatitude(text)}
            defaultValue={latitude}
          />
        </View>

        <View style={styles.responseBox}>
          <TextInput
            style={{ height: 40 }}
            placeholder='Longitude'
            onChangeText={(text) => setLongitude(text)}
            defaultValue={longitude}
          />
        </View>
        <View style={styles.responseBox}>
          <TextInput
            style={{ height: 40 }}
            placeholder='Neighborhood'
            onChangeText={(text) => setNeighborhood(text)}
            defaultValue={neighborhood}
          />
        </View>
        <View style={styles.responseBox}>
          <TextInput
            style={{ height: 40 }}
            placeholder='Address'
            onChangeText={(text) => setAddress(text)}
            defaultValue={address}
          />
        </View>
        <View style={styles.responseBox}>
          <TextInput
            style={{ height: 40 }}
            placeholder='Apartment #'
            onChangeText={(text) => setApt(text)}
            defaultValue={apt}
          />
        </View>
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
        </View>
      </View>
      <Button title='Submit' onPress={() => handleClick()} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  words: {
    borderWidth: 1,
    height: 30,

    borderRadius: 15,
    width: 'auto',
    padding: 15,
    alignItems: 'flex-start',
    paddingBottom: 30,
    borderColor: 'blue',
    margin: 5,
    fontWeight: '300',
  },
  responseBox: {
    borderWidth: 1,
    marginTop: 10,
    width: 240,
    borderRadius: 15,
    paddingLeft: 15,
    paddingTop: 2,
    borderColor: 'blue',
    height: 45,
  },
  cirleImage: {
    width: 110,
    height: 110,
    borderRadius: 400 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default NewListingScreen
