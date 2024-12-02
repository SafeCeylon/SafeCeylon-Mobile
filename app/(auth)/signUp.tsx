import React, { useState, useEffect } from 'react';
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
import axios, { AxiosError } from 'axios';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import images from '@/constants/Images';
import { MapPressEvent } from 'react-native-maps';

const SignUpPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 6.9271,
    longitude: 79.8612,
  });
  const [region, setRegion] = useState({
    latitude: 6.9271,
    longitude: 79.8612,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to use this feature.'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude,
        longitude,
      }));

      setMarkerCoordinate({
        latitude,
        longitude,
      });
    };

    getCurrentLocation();
  }, []);

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerCoordinate({ latitude, longitude });
  };

  const handleSignUp = async () => {
    if (
      !name ||
      !nic ||
      !mobileNumber ||
      !email ||
      !password ||
      !confirmPassword ||
      !address
    ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const userData = {
        name,
        nic,
        mobileNumber,
        email,
        address,
        latitude: markerCoordinate.latitude,
        longitude: markerCoordinate.longitude,
        password,
      };

      const response = await axios.post(
        `http://192.168.1.14:8080/api/users/register`,
        userData
      );

      if (response.status === 201) {
        Alert.alert('Success', 'User registered successfully!');
        router.push('/signIn');
      } else {
        Alert.alert('Error', 'Unexpected response from server.');
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response && error.response.status === 409) {
        Alert.alert('Error', 'User already exists.');
      } else {
        console.error(error);
        Alert.alert('Error', 'Failed to register user.');
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
          <Image source={images.logo3} style={styles.logo} />
          <Text style={styles.title}>Sign Up</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Create Your Account</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="NIC"
              value={nic}
              onChangeText={setNic}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Mobile Number"
              value={mobileNumber}
              keyboardType="phone-pad"
              onChangeText={setMobileNumber}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.instructionText}>
            Tap on the map to place a marker at your home location.
          </Text>
          <MapView style={styles.map} region={region} onPress={handleMapPress}>
            <Marker coordinate={markerCoordinate} />
          </MapView>

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
    marginTop: '15%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: '60%',
    height: 50,
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  formContainer: {
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
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
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
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
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
    fontWeight: 'bold',
  },
});

export default SignUpPage;
