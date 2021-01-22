import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Context } from '../Context'

const ListingOnPage = ({
  image,
  neighborhood,
  address,
  apt,
  beds,
  baths,
  price,
}) => {
  const { ipAdress } = useContext(Context)

  console.log(image)

  return (
    <View style={styles.screen}>
      <View
        style={{ flexDirection: 'row', backgroundColor: 'white', width: 395 }}
      >
        <View>
          <Image source={{ uri: image.image }} style={styles.prevImage} />
        </View>
        <View style={{ paddingLeft: 7 }}>
          <View style={styles.hood}>
            <Text style={styles.hoodText}>{`${neighborhood}`}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.priceText}>{`$${price}`}</Text>
            <Text>{`${address}`}</Text>
            <Text>{`apt #${apt}`}</Text>
            <Text>{`${beds} bed, ${baths} bath`}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'black',
    height: 220,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  hoodText: {
    color: 'grey',
    fontSize: 17,
  },
  priceText: {
    color: 'blue',
    fontWeight: '700',
    fontSize: 17,
  },
  hood: {
    paddingTop: 10,
    paddingLeft: 5,
  },
  info: {
    paddingTop: 107,
    paddingLeft: 3,
  },

  prevImage: {
    borderWidth: 2,
    borderColor: 'white',
    width: 220,
    height: 220,

    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ListingOnPage
