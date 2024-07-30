import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import logo from '../assets/images/Logo3.png';
import axios from 'axios';

const SignUpPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidNic = (nic) => {
    return nic.length === 10 || nic.length === 12; // Assuming NIC is either 10 or 12 characters long
  };

  const isValidMobileNumber = (mobileNumber) => {
    return mobileNumber.length === 10; // Assuming mobile number is 10 digits
  };

  const isValidPassword = (password) => {
    return password.length >= 6; // Password must be at least 6 characters
  };

  const handleSignUp = () => {
    if (!name || !nic || !mobileNumber || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Invalid email format.');
      return;
    }
    if (!isValidNic(nic)) {
      Alert.alert('Error', 'Invalid NIC format.');
      return;
    }
    if (!isValidMobileNumber(mobileNumber)) {
      Alert.alert('Error', 'Mobile number must be 10 digits.');
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const userData = {
      name,
      nic,
      mobileNumber,
      email,
      password,
    };
    axios.post('http://192.168.1.14:4000/signup', userData).then((response) => {
      if (response.data.status === 409) {
        Alert.alert('Error', 'User already exists.');
      } else if (response.data.status === 200) {
        Alert.alert('Success', 'User registered successfully!');
        router.push('/signIn');
      } else {
        Alert.alert('Error', 'Failed to register user.');
      }
    }).catch((error) => {
      console.error(error);
      Alert.alert('Error', 'Failed to register user.');
    });
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
          <Text style={styles.title}>Sign Up</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.instructionText}>
            Provide your personal details to register with the system.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            accessibilityLabel="Full Name"
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="NIC"
              value={nic}
              onChangeText={setNic}
              accessibilityLabel="NIC"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Mobile Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              accessibilityLabel="Mobile Number"
            />
          </View>
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
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            accessibilityLabel="Confirm Password"
          />
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <LinearGradient
              colors={['#007B70', '#00E1CD']}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradientButton}
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.linkText} onPress={() => router.push('/signIn')}>Sign In</Text>
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
  halfInput: {
    width: '48%',
  },
  signUpButton: {
    width: '100%',
    marginBottom: 15,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  signUpText: {
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

export default SignUpPage;
