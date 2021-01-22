import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const listingPreview = ({
  navigation,
  neighborhood,
  address,
  apt,
  beds,
  baths,
  price,
}) => {
  return (
    <View style={styles.screen}>
      <Text>{`${neighborhood}`}</Text>
      <Text>{`${address} apt #${apt}`}</Text>

      <Text>{`${beds}-bed ${baths}-bath`}</Text>
      <Text>{`$${price}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    borderWidth: 4,
    borderColor: '#20232a',
    height: 200,
    justifyContent: 'flex-end',
    // marginTop: 450,
    backgroundColor: 'white',
  },
})

export default listingPreview
