import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Button,
} from 'react-native'
import MapView, { AnimatedRegion, Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Context } from '../Context'
import ListingPreview from '../components/ListingPreview'
import ListingOnPage from '../components/ListingOnPage'

const SearchScreen = ({ navigation, route }) => {
  const { routeLatitude, routeLongitude, RouteNeighborhoodName } = route.params
  const [isLoading, setIsLoading] = useState(true)
  const [locationResult, setLocation] = useState(null)
  const [listings, setListings] = useState([])
  const [mapRegion, setRegion] = useState(null)
  const [hasLocationPermissions, setLocationPermission] = useState(false)
  const { ipAdress } = useContext(Context)
  const [previewMode, setPreviewMode] = useState(false)
  const [images, setImages] = useState([])
  const [neighborhood, setNeighborhood] = useState('')
  const [address, setAddress] = useState('')
  const [apt, setApt] = useState('')
  const [beds, setBeds] = useState('')
  const [baths, setBaths] = useState('')
  const [price, setPrice] = useState('')
  const [prevImage, setPrevImage] = useState('')

  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      if ('granted' !== status) {
        setLocation('Permission to access location was denied')
      } else {
        setLocationPermission(true)
      }

      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({})
      setLocation(JSON.stringify({ latitude, longitude }))

      // Center the map on the location we just fetched.
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
      setIsLoading(false)
    }
    getListings()
    getLocationAsync()
    getImages()
  }, [])

  let foundImage

  const getImages = async () => {
    const response = await fetch(`http://${ipAdress}:4001/image/all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const resData = await response.json()
    setImages(resData)
  }

  const handleClick = (nbhd, address, apt, beds, baths, price, foundImage) => {
    setPreviewMode(true)
    setNeighborhood(nbhd)
    setAddress(address)
    setApt(apt)
    setBeds(beds)
    setBaths(baths)
    setPrice(price)
    setPrevImage(foundImage)
    console.log(previewMode)
  }

  const getListings = async () => {
    const response = await fetch(`http://${ipAdress}:4001/listings`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const resData = await response.json()
    setListings(resData)
  }

  console.log(previewMode)
  console.log(listings)

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude: routeLatitude
          ? parseFloat(routeLatitude)
          : mapRegion.latitude,
        longitude: routeLongitude
          ? parseFloat(routeLongitude)
          : mapRegion.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.03,
      }}
    >
      {listings.map((listing, i) => {
        foundImage = images.find((img) => img.listing_id == listing.id)
        return (
          <View key={i}>
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(listing.latitude),
                longitude: parseFloat(listing.longitude),
              }}
              onPress={() =>
                handleClick(
                  listing.neighborhood,
                  listing.address,
                  listing.apt,
                  listing.beds,
                  listing.baths,
                  listing.price,
                  foundImage
                )
              }
            >
              <Ionicons name='ellipse' size={22} color='blue' />
            </MapView.Marker>
          </View>
        )
      })}

      <MapView.Marker
        coordinate={mapRegion}
        onPress={() => setPreviewMode(true)}
      >
        <Ionicons name='home' size={30} color='blue' />
      </MapView.Marker>

      <MapView.Marker coordinate={{ latitude: 40.74744, longitude: -74.00116 }}>
        <Ionicons name='elipse' size={30} color='blue' />
      </MapView.Marker>
      {previewMode !== false ? (
        <View>
          <Button title='exit' onPress={() => setPreviewMode(false)} />
          <ListingOnPage
            navigation={navigation}
            neighborhood={neighborhood}
            address={address}
            apt={apt}
            beds={beds}
            baths={baths}
            price={price}
            image={prevImage}
          />
        </View>
      ) : (
        <View></View>
      )}
    </MapView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default SearchScreen
