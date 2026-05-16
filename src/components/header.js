import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const Header = ({ isHomeTab = false }) => {

    const insets = useSafeAreaInsets();
    const navigation = useNavigation()

    return (
        <View style={{ paddingTop: insets.top ? insets.top : 10, paddingBottom: 10, backgroundColor: '#fff', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            {
                !isHomeTab ? (
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                        <Icon name={'chevron-back-outline'} size={25} />
                    </TouchableOpacity>
                ) : null
            }
            <Text style={[styles.logoText, { alignSelf: 'center' }]}>Epicurean</Text>
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
    backButton: {
        flex: 0.45
    }
})