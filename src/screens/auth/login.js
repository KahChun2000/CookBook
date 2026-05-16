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

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const onLogin = async () => {
        setErrorMsg('');
        const e = email.trim();

        if (!e || !password) {
            setErrorMsg('Please fill in email and password.');
            return;
        }

        if (!isValidEmail(e)) {
            setErrorMsg('Invalid email format.');
            return;
        }

        try {
            setSubmitting(true);
            await login(e, password);
        } catch (err) {
            const code = err?.code;

            if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
                setErrorMsg('Incorrect email or password.');
            } else if (code === 'auth/invalid-email') {
                setErrorMsg('Invalid email format.');
            } else {
                setErrorMsg(code || err?.message || 'Unknown error');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground
                    source={require('./images/loginBg.png')}
                    resizeMode="cover"
                    style={styles.headerImage}>
                    <View style={[styles.headerOverlay, { paddingTop: insets.top + 12 }]}>
                        <Text style={styles.logoText}>Epicurean</Text>
                    </View>
                </ImageBackground>
                <KeyboardAvoidingView
                    style={styles.keyboardContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom }]}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.card}>
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>
                                Sign in to continue your culinary journey.
                            </Text>

                            <View style={styles.form}>
                                <Text style={styles.label}>Email Address</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="mail-outline" size={22} color="#6f776a" />
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
                                    <Icon name="lock-closed-outline" size={22} color="#6f776a" />
                                    <TextInput
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholder="••••••••"
                                        placeholderTextColor="#c5cabe"
                                        secureTextEntry={!showPassword}
                                        style={styles.input}
                                    />

                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                        <Icon
                                            name={!showPassword ? 'eye-off-outline' : 'eye-outline'}
                                            size={24}
                                            color="#6f776a"
                                        />
                                    </TouchableOpacity>
                                </View>

                                {!!errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

                                <PrimaryButton
                                    activeOpacity={0.85}
                                    disabled={submitting}
                                    onPress={onLogin}
                                    style={styles.signInButton}
                                    label={'Sign In'}
                                    loading={submitting}
                                />

                                <TouchableOpacity>
                                    <Text style={styles.forgotText}>Forgot Password?</Text>
                                </TouchableOpacity>

                                <View style={styles.divider} />

                                <View style={styles.footer}>
                                    <Text style={styles.footerText}>Don't have an account?</Text>
                                    <TouchableOpacity onPress={() => navigation?.navigate('Signup')}>
                                        <Text style={styles.createText}> Create Account</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f5ef',
    },
    headerImage: {
        width,
        height: height * 0.38,
    },
    headerOverlay: {
        flex: 1,
        paddingHorizontal: 18,
        backgroundColor: 'rgba(245,245,235,0.25)',
    },
    logoText: {
        fontSize: 38,
        fontWeight: '900',
        color: '#ffffff',
        letterSpacing: 0.5,
    },
    keyboardContainer: {
        flex: 1,
        marginTop: -Dimensions.get('window').height * 0.1,
    },

    scrollContent: {
        flexGrow: 1,
    },

    card: {
        flex: 1,
        backgroundColor: '#fbf8f1',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 20,
        paddingTop: 28,
        paddingBottom: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#2f2d28',
    },
    subtitle: {
        fontSize: 16,
        color: '#56564f',
        marginTop: 5,
    },
    form: {
        marginTop: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: '700',
        color: '#4a4b43',
        marginBottom: 8,
    },
    inputContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2efe8',
        borderRadius: 11,
        paddingHorizontal: 14,
        marginBottom: 26,
    },
    input: {
        flex: 1,
        height: '100%',
        marginLeft: 12,
        fontSize: 16,
        color: '#2f2d28',
    },
    passwordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    forgotText: {
        fontSize: 13,
        color: '#a94800',
        fontWeight: '600',
        marginTop: 10,
        alignSelf: 'flex-end'
    },
    errorText: {
        color: '#c0392b',
        marginTop: -12,
        marginBottom: 14,
        fontSize: 14,
        textAlign: 'center'
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
    },
    signInText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#c9cabc',
        marginTop: 20,
        marginBottom: 28,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#4c4c45',
    },
    createText: {
        fontSize: 16,
        color: '#124e16',
        fontWeight: '800',
    },
});