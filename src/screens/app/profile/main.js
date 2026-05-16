import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../components/header'

const Profile = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header isHomeTab={true} />
            <Text>Profile</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})