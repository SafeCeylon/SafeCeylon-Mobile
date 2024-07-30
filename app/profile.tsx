
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import profilePic from '../assets/images/profilePic.jpeg'; // Updated profile picture path
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Import expo-image-picker


const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  // const [profilePicture, setProfilePic] = useState(null);
  const router = useRouter();

  // const selectPhoto = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //     base64: true,
  //     freeformCrop: true,
  //   });

  //   if (!result.canceled) {
  //     console.log(result.assets[0]);
  //     const data= <Image source={{ uri: 'data:image/jpeg;base64,' + asset.base64 }} style={{ width: 200, height: 200 }}/>
  //     setProfilePic(data);
  //   }
  // };

  async function getData() {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://192.168.1.14:4000/userdata', { token: token });
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#007B70", "#00E1CD"]}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileSection}>
          <View style={styles.profilePicContainer}>
            <Image source={profilePic} style={styles.profilePic} />
            <TouchableOpacity style={styles.editButton}>
              <FontAwesome5 name="pen" size={20} color="#007B70" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{userData.name}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailText}>Colombo, Sri Lanka</Text>

          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailText}>No 05, Kottawa, Pannipitiya</Text>

          <Text style={styles.detailLabel}>NIC:</Text>
          <Text style={styles.detailText}>{userData.nic}</Text>

          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailText}>{userData.mobileNumber}</Text>

          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailText}>{userData.email}</Text>

          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={() => router.push("/resetPw")}
          >
            <LinearGradient
              colors={["#007B70", "#00E1CD"]}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Change Password</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.changePasswordButton} onPress={() => router.push('/signIn')}>
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

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/dashboard")}
        >
          <FontAwesome5 name="home" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/map")}
        >
          <FontAwesome5 name="map" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/comments")}
        >
          <FontAwesome5 name="comments" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/notifications")}
        >
          <FontAwesome5 name="bell" size={24} color="#ccc" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>6</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/profile")}
        >
          <FontAwesome5 name="user" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 10,
    
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  scrollContainer: {
    flexGrow: 1,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profilePicContainer: {
    paddingTop: 60,
    position: "relative",
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: "#fff",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff", // White background for the pen icon
    borderRadius: 20,
    padding: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007B70",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  changePasswordButton: {
    marginTop: 20,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    right: -6,
    top: -5,
    backgroundColor: "black",
    borderRadius: 8,
    padding: 2,
    paddingHorizontal: 5,
  },
  notificationText: {
    color: "#fff",
    fontSize: 10,
  },
});

export default ProfilePage;
