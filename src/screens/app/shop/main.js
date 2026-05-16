import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../components/header'

const Shop = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header isHomeTab={true} />
            <Text>Shop</Text>
        </View>
    )
}

export default Shop

const styles = StyleSheet.create({})