import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function PrimaryButton({ onPress, label, loading, buttonStyle, disable, labelStyle }) {
    return (
        <TouchableOpacity style={[InlineStyles.button, buttonStyle, disable && InlineStyles.disabled]} onPress={onPress} disabled={disable || loading}>
            {loading ? <ActivityIndicator color={'#F5F5F5'} /> : <Text style={[InlineStyles.buttonText, labelStyle]}>{label}</Text>}
        </TouchableOpacity>
    );
}

const InlineStyles = StyleSheet.create({
    button: {
        backgroundColor: '#124e16',
        borderRadius: 15,
        paddingVertical: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    disabled: {
        backgroundColor: '#D3D3D3',
    },
});