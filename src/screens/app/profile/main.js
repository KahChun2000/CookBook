import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useContext } from 'react';
import Header from '../../../components/header';
import { AuthContext } from '../../../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { logout } = useContext(AuthContext);
    const user = useSelector(state => state.user);

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Confirm',
                style: 'destructive',
                onPress: logout,
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Header isHomeTab={true} />

            <View style={styles.content}>
                <View style={styles.profileCard}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            style={styles.proPic}
                            source={{
                                uri:
                                    user?.photoURL ||
                                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                            }}
                        />

                        <View style={styles.cameraButton}>
                            <Icon name="camera-outline" size={18} color="#fff" />
                        </View>
                    </View>

                    <Text style={styles.name}>
                        {user?.displayName || 'Recipe Lover'}
                    </Text>

                    <Text style={styles.email}>
                        {user?.email || '-'}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.logoutBtn}
                    activeOpacity={0.85}
                    onPress={handleLogout}>
                    <View style={styles.logoutIconBox}>
                        <Icon name="log-out-outline" size={22} color="#B00020" />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.logoutText}>Logout</Text>
                        <Text style={styles.logoutSubText}>
                            Sign out from your account
                        </Text>
                    </View>

                    <Icon name="chevron-forward" size={22} color="#B00020" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const MenuItem = ({ icon, title, subtitle }) => {
    return (
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={styles.menuIconBox}>
                <Icon name={icon} size={22} color="#145214" />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.menuTitle}>{title}</Text>
                <Text style={styles.menuSubtitle}>{subtitle}</Text>
            </View>

            <Icon name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F6EF',
    },

    content: {
        padding: 20,
    },

    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },

    avatarWrapper: {
        position: 'relative',
        marginBottom: 14,
    },

    proPic: {
        height: 120,
        width: 120,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#E2EAD9',
    },

    cameraButton: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#145214',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },

    name: {
        fontSize: 26,
        fontWeight: '800',
        color: '#1F3B1F',
        marginTop: 6,
    },

    email: {
        fontSize: 15,
        color: '#6B7167',
        marginTop: 6,
    },

    menuCard: {
        marginTop: 22,
        backgroundColor: '#fff',
        borderRadius: 22,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 3,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 16,
    },

    menuIconBox: {
        width: 46,
        height: 46,
        borderRadius: 16,
        backgroundColor: '#EAF2E4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    menuTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222',
    },

    menuSubtitle: {
        fontSize: 13,
        color: '#777',
        marginTop: 3,
    },

    logoutBtn: {
        marginTop: 22,
        backgroundColor: '#fff',
        borderRadius: 22,
        paddingHorizontal: 18,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFD4D4',
    },

    logoutIconBox: {
        width: 46,
        height: 46,
        borderRadius: 16,
        backgroundColor: '#FFE1E1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#B00020',
    },

    logoutSubText: {
        fontSize: 13,
        color: '#B65C5C',
        marginTop: 3,
    },
});