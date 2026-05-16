import React, { useContext, useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import PrimaryButton from '../../components/Primarybutton';

const Register = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { signup } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isValidEmail = email => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const onSignup = async () => {
        setErrorMsg('');
        const n = name.trim();
        const e = email.trim();

        if (!n || !e || !password) {
            setErrorMsg('Please fill in name, email, and password.');
            return;
        }
        if (!isValidEmail(e)) {
            setErrorMsg('Invalid email format.');
            return;
        }
        if (password.length < 6) {
            setErrorMsg('Password must be at least 6 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match.');
            return;
        }

        try {
            setSubmitting(true);
            await signup(n, e, password);
        } catch (err) {
            const code = err?.code;

            if (code === 'auth/email-already-in-use') {
                setErrorMsg('Email already in use.');
            } else if (code === 'auth/invalid-email') {
                setErrorMsg('Invalid email format.');
            } else if (code === 'auth/weak-password') {
                setErrorMsg('Password is too weak (min 6 chars).');
            } else {
                setErrorMsg(code || err?.message || 'Unknown error');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom }]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={{ paddingTop: insets.top + 12 }}>
                            <Text style={styles.logoText}>Epicurean</Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>
                                Join Epicurean and start your culinary journey.
                            </Text>

                            <View style={styles.form}>
                                <Text style={styles.label}>Full Name</Text>
                                <View style={styles.inputContainer}>
                                    <Icon
                                        name="person-outline"
                                        size={22}
                                        color="#6f776a"
                                    />
                                    <TextInput
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="Your name"
                                        placeholderTextColor="#c5cabe"
                                        autoCapitalize="words"
                                        style={styles.input}
                                    />
                                </View>

                                <Text style={styles.label}>Email Address</Text>
                                <View style={styles.inputContainer}>
                                    <Icon
                                        name="mail-outline"
                                        size={22}
                                        color="#6f776a"
                                    />
                                    <TextInput
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholder="chef@epicurean.com"
                                        placeholderTextColor="#c5cabe"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        style={styles.input}
                                    />
                                </View>

                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputContainer}>
                                    <Icon
                                        name="lock-closed-outline"
                                        size={22}
                                        color="#6f776a"
                                    />
                                    <TextInput
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholder="••••••••"
                                        placeholderTextColor="#c5cabe"
                                        secureTextEntry={!showPassword}
                                        style={styles.input}
                                    />
                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowPassword(!showPassword)
                                        }>
                                        <Icon
                                            name={
                                                !showPassword
                                                    ? 'eye-off-outline'
                                                    : 'eye-outline'
                                            }
                                            size={24}
                                            color="#6f776a"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.label}>Confirm Password</Text>
                                <View style={styles.inputContainer}>
                                    <Icon
                                        name="lock-closed-outline"
                                        size={22}
                                        color="#6f776a"
                                    />
                                    <TextInput
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        placeholder="••••••••"
                                        placeholderTextColor="#c5cabe"
                                        secureTextEntry={!showConfirmPassword}
                                        style={styles.input}
                                    />
                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword,
                                            )
                                        }>
                                        <Icon
                                            name={
                                                !showConfirmPassword
                                                    ? 'eye-off-outline'
                                                    : 'eye-outline'
                                            }
                                            size={24}
                                            color="#6f776a"
                                        />
                                    </TouchableOpacity>
                                </View>

                                {!!errorMsg && (
                                    <Text style={styles.errorText}>
                                        {errorMsg}
                                    </Text>
                                )}

                                <PrimaryButton
                                    activeOpacity={0.85}
                                    disabled={submitting}
                                    onPress={onSignup}
                                    style={styles.signInButton}
                                    label={'Create an account'}
                                    loading={submitting}
                                />

                                <View style={styles.divider} />

                                <View style={styles.footer}>
                                    <Text style={styles.footerText}>
                                        Already have an account?
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation?.navigate('Login')
                                        }>
                                        <Text style={styles.createText}>
                                            {' '}
                                            Sign In
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f5ef',
    },
    logoText: {
        fontSize: 28,
        fontWeight: '900',
        color: '#154212',
        letterSpacing: 0.5,
        textAlign: 'center'
    },
    keyboardContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    card: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#2f2d28',
    },
    subtitle: {
        fontSize: 15,
        color: '#56564f',
        marginTop: 5,
    },
    form: {
        marginTop: 18,
    },
    label: {
        fontSize: 15,
        fontWeight: '700',
        color: '#4a4b43',
        marginBottom: 8,
    },
    inputContainer: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2efe8',
        borderRadius: 11,
        paddingHorizontal: 14,
        marginBottom: 18,
    },
    input: {
        flex: 1,
        height: '100%',
        marginLeft: 12,
        fontSize: 16,
        color: '#2f2d28',
    },
    errorText: {
        color: '#c0392b',
        marginTop: -4,
        marginBottom: 14,
        fontSize: 14,
        textAlign: 'center',
    },
    signInButton: {
        height: 58,
        backgroundColor: '#124e16',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#124e16',
        shadowOpacity: 0.25,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
        marginTop: 4,
    },
    signInText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#c9cabc',
        marginTop: 30,
        marginBottom: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 15,
        color: '#4c4c45',
    },
    createText: {
        fontSize: 15,
        color: '#124e16',
        fontWeight: '800',
    },
});