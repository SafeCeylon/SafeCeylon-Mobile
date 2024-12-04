import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '@/constants/Images';
import { Alert } from 'react-native';


const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    nic: '',
    mobileNumber: '',
    email: '',
    profilePicUrl: '',
    longitude: '',
    latitude: '',
    address: '',
  });

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function getData() {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token retrieved:', token); // Check the value of token
      if (token) {
        const response = await axios.post(
          'http://192.168.1.44:8080/api/users/userdata',
          // Send empty body as the token is in the header
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data); // Assuming response contains user data directly
        setLoading(false); // Set loading to false once the data is fetched
      } else {
        Alert.alert('Error', 'Token not found. Please log in again.');
        router.push('/signIn');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while fetching data.');
    }
}

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#007B70', '#00E1CD']}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileSection}>
          <View style={styles.profilePicContainer}>
            {/* Display profile picture dynamically */}
            <Image 
              source={userData.profilePicUrl ? { uri: userData.profilePicUrl } : images.profilePic}
              style={styles.profilePic}
            />
            <TouchableOpacity style={styles.editButton}>
              <FontAwesome5 name="pen" size={20} color="#007B70" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{userData.name}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailText}>LN:{userData.longitude}   LT:{userData.latitude} </Text>

          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailText}>{userData.address}</Text>

          <Text style={styles.detailLabel}>NIC:</Text>
          <Text style={styles.detailText}>{userData.nic}</Text>

          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailText}>{userData.mobileNumber}</Text>

          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailText}>{userData.email}</Text>

          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={() => router.push('/resetPw')}
          >
            <LinearGradient
              colors={['#007B70', '#00E1CD']}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Change Password</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={async () => {
              try {
                Alert.alert(
                  'Logout',
                  'Are you sure you want to log out?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Yes', onPress: async () => {
                        await AsyncStorage.removeItem('token');
                        await axios.post('http://192.168.1.44:8080/api/users/logout');
                        router.push('/signIn');
                      }
                    },
                  ],
                )
              } catch (error) {
                console.error('Error during logout:', error);
                Alert.alert('Error', 'An error occurred while logging out.');
              }
            }}
          >
            <LinearGradient
              colors={['#007B70', '#00E1CD']}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Logout</Text>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicContainer: {
    paddingTop: 60,
    position: 'relative',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#fff',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007B70',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  changePasswordButton: {
    marginTop: 20,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProfilePage;
