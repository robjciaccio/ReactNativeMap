import React, { useState, useContext, useLayoutEffect, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native'
import ListingOnPage from '../components/ListingOnPage'
import { Context } from '../Context'

const FavoritesScreen = ({ navigation }) => {
  const { logOut, ipAdress } = useContext(Context)
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [images, setImages] = useState([])

  setTimeout(() => {
    setIsLoading(false)
  }, 2500)

  useEffect(() => {
    getListings()
    console.log(listings)
  }, [navigation])

  useEffect(() => {
    getImages()
  }, [])

  const getImages = async () => {
    const response = await fetch(`http://${ipAdress}:4001/image/all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const resData = await response.json()
    setImages(resData)
  }

  const getListings = async () => {
    const response = await fetch(`http://${ipAdress}:4001/listings`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const resData = await response.json()
    setListings(resData)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title='LogOut' onPress={() => logOut()} />,
    })
  }, [navigation])

  let foundImage

  return isLoading ? (
    <View style={styles.screen}>
      <ActivityIndicator size='large' />
    </View>
  ) : (
    <ScrollView style={styles.screen}>
      <View>
        {listings.map((listing, i) => {
          foundImage = images.find((img) => img.listing_id == listing.id)
          return (
            <ListingOnPage
              key={i}
              image={foundImage}
              neighborhood={listing.neighborhood}
              address={listing.address}
              apt={listing.apt}
              beds={listing.beds}
              baths={listing.baths}
              price={listing.price}
            />
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    // flex: 0,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
})

export default FavoritesScreen
