import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../components/header'

const Dashboard = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 110 }}>

            </ScrollView>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({})