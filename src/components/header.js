import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Header = () => {

    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top ? insets.top : 10, paddingBottom: 10, backgroundColor: '#fff', paddingHorizontal: 20 }}>
            <Text style={styles.logoText}>Epicurean</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    logoText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#154212',
        letterSpacing: 0.5,
    },
})