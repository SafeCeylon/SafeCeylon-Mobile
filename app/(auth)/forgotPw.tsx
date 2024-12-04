import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import logo from '@/assets/images/Logo3.png';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    try {
      const response = await axios.post(
        'http://192.168.1.44:8080/api/users/password-reset',
        { email }
      );
  
      Alert.alert('Success', 'Password reset link sent to your email.');
      router.push('/emailVerify');
      
    } catch (error: unknown) { 
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        const errorMessage = error.response?.data?.message || 'An error occurred while sending the password reset link.';
        Alert.alert('Error', errorMessage);
      } else if (error instanceof Error) {
        // Handle other types of errors that are instances of Error
        Alert.alert('Error', error.message);
      } else {
        // For any unknown error type
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
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
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Forgot Password</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.instructionText}>
            Enter the email associated with your account and we'll send an email
            with instructions to reset your password.
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
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handlePasswordReset}
          >
            <LinearGradient
              colors={['#007B70', '#00E1CD']}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradientButton}
            >
              <Text style={styles.resetText}>Send Instructions</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.linkText}
              onPress={() => router.push('/signIn')}
            >
              Sign In
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
    marginBottom: 20,
  },
  resetButton: {
    width: '100%',
    marginBottom: 20,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetText: {
    color: '#fff',
    fontSize: 18,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  linkText: {
    fontSize: 16,
    color: '#00E1CD',
  },
});

export default ForgotPasswordPage;
