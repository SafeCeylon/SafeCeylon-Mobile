import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import images from '@/constants/Images';

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    const userData = {
      email,
      password,
    };
    axios
      .post('http://192.168.8.103:4000/login', userData)
      .then((res) => {
        if (res.data.status === 404) {
          Alert.alert('Error', 'User not found.');
        } else if (res.data.status === 405) {
          Alert.alert('Error', 'Invalid Password.');
        } else {
          Alert.alert('Success', 'Logged in successfully.');
          AsyncStorage.setItem('token', res.data.token);
          if (rememberMe) {
            //remeber me data
          }
          router.push('/home');
        }
      })
      .catch((err) => {
        Alert.alert('Error', err.message);
      });
  };

  const handleForgot = () => {
    router.push('/forgotPw');
  };

  return (
    <LinearGradient
      colors={['#007B70', '#00E1CD']}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Image source={images.logo3} style={styles.logo} />
          <Text style={styles.title}>Sign In</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.instructionText}>
            To keep connected with us please login with your personal info
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            accessibilityLabel="Email Address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            accessibilityLabel="Password"
          />
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
              accessibilityLabel="Remember Me"
            >
              <View
                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
              />
              <Text style={styles.checkboxText}>Remember me?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgot}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <LinearGradient
              colors={['#007B70', '#00E1CD']}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradientButton}
            >
              <Text style={styles.signInText}>Sign in</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            Don’t have an account?{' '}
            <Text
              style={styles.linkText}
              onPress={() => router.push('/signUp')}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 3,
    paddingRight: 3,
  },
  headerContainer: {
    marginTop: '20%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: '55%',
    height: 50,
    marginBottom: 40,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#00E1CD',
  },
  checkboxText: {
    fontSize: 16,
    color: '#666',
  },
  linkText: {
    fontSize: 16,
    color: '#00E1CD',
  },
  signInButton: {
    width: '100%',
    marginBottom: 15,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 18,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SignInPage;
