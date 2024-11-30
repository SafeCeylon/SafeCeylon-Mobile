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
// import bcrypt from 'bcryptjs';
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
        Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
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
    if (!name || !nic || !mobileNumber || !email || !password || !confirmPassword || !address) {
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
  
      const response = await axios.post(`http://192.168.1.14:8080/api/users/register`, userData);
  
      if (response.status === 201) { // 201 is HttpStatus.CREATED
        Alert.alert('Success', 'User registered successfully!');
        router.push('/signIn');
      } else {
        Alert.alert('Error', 'Unexpected response from server.');
      }
    } catch (err) {
      const error = err as AxiosError; // Cast 'err' to 'AxiosError'
  
      if (error.response && error.response.status === 409) { // 409 is HttpStatus.CONFLICT
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

          <Text style={styles.mapInstruction}>
            Tap on the map to place a marker at your home location.
          </Text>
          <MapView
            style={styles.map}
            region={region}
            onPress={handleMapPress}
          >
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
  gradientBackground: { flex: 1 },
  scrollContainer: { flexGrow: 1 },
  headerContainer: { alignItems: 'center', marginVertical: 20 },
  logo: { width: 100, height: 100 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  formContainer: { padding: 20 },
  input: { backgroundColor: '#fff', marginBottom: 10, padding: 10, borderRadius: 5 },
  map: { width: '100%', height: 200, marginVertical: 15 },
  mapInstruction: { textAlign: 'center', marginBottom: 10, fontStyle: 'italic' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { flex: 1, marginHorizontal: 5 },
  button: { backgroundColor: '#007B70', padding: 10, borderRadius: 5, marginBottom: 10 },
  buttonText: { color: '#fff', textAlign: 'center' },
  signUpButton: { marginTop: 20 },
  gradientButton: { padding: 15, borderRadius: 5, alignItems: 'center' },
  signUpText: { color: '#fff', fontWeight: 'bold' },
});

export default SignUpPage;
