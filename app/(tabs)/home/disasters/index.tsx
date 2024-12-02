import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { Alert } from "react-native";
import axios from "axios";
import images from "@/constants/Images";
import icons from "@/constants/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

interface Disaster {
  id: string;

  type: string;

  latitude: number;

  longitude: number;

  radius: number;

  reportedAt: string;

  resolved: boolean;

  reportedBy: string;

  category?: "Danger" | "Watchout" | "Safe";

  distance?: number; // Distance to the user in meters
}

interface Disaster {
  id: string;
  type: string;
  latitude: number;
  longitude: number;
  radius: number;
  reportedAt: string;
  resolved: boolean;
  reportedBy: string;
  category?: 'Danger' | 'Watchout' | 'Safe';
  distance?: number; // Distance to the user in meters
}

const DisastersScreen: React.FC = () => {
  const router = useRouter();
  const [disasters, setDisasters] = useState<Disaster[]>([]);

  const calculateDistanceToEdge = (
    userLat: number,
    userLon: number,
    disasterLat: number,
    disasterLon: number,
    radius: number
  ): number => {
    const R = 6371e3; // Radius of Earth in meters
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  
    const φ1 = toRadians(userLat);
    const φ2 = toRadians(disasterLat);
    const Δφ = toRadians(disasterLat - userLat);
    const Δλ = toRadians(disasterLon - userLon);
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distanceToCenter = R * c; // Distance from user to disaster center in meters
    const distanceToEdge = Math.max(0, distanceToCenter - radius); // Distance to edge (cannot be negative)
    return distanceToEdge;
  };

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
    
        // Fetch disasters
        const response = await axios.get<Disaster[]>(
          'http://192.168.1.101:8080/api/users/all-disasters',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        // Fetch user data for home location
        const userDataResponse = await axios.post(
          'http://192.168.1.101:8080/api/users/userdata',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        const { latitude: userLat, longitude: userLon } = userDataResponse.data;
    
        const categorizedDisasters = response.data.map((disaster) => {
          const distanceToEdge = calculateDistanceToEdge(
            userLat,
            userLon,
            disaster.latitude,
            disaster.longitude,
            disaster.radius
          );
    
          let category: 'Danger' | 'Watchout' | 'Safe';
          if (distanceToEdge === 0) {
            category = 'Danger';
          } else if (distanceToEdge <= 1000) {
            category = 'Watchout';
          } else {
            category = 'Safe';
          }
    
          return { ...disaster, category, distance: distanceToEdge };
        });
    
        // Sort disasters by danger level
        const sortedDisasters = categorizedDisasters.sort((a, b) => {
          const order = { Danger: 1, Watchout: 2, Safe: 3 };
          return order[a.category!] - order[b.category!];
        });
    
        setDisasters(sortedDisasters);
      } catch (error) {
        console.error('Error fetching disasters:', error);
      }
    };    
    fetchDisasters();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.deafultBGClipped}
        style={styles.headerBackgroundImage}
      >
        <View style={styles.headerContent}>
          <Image source={images.logo3} style={styles.logo} />
        </View>
      </ImageBackground>

      <View style={styles.disasterImageContainer}>
        <View style={styles.imageWrapper}>
          <Image source={images.disaster} style={styles.disasterImage} />
          <View style={styles.textOverlay}>
            <Text style={styles.disastersHeaderText}>Disasters</Text>
            <Text style={styles.disastersHeaderSubText}>
              Manage user reports, View DMC reports, View hospitals, shelters
              locations and Avoid disasters.
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.cardContainer}>
          {disasters.map((disaster, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{disaster.type}</Text>
              <Text style={styles.cardStatus}>
                Status:
                <Text
                  style={
                    disaster.resolved
                      ? styles.statusUnavailable
                      : styles.statusAvailable
                  }
                >
                  {disaster.resolved ? " Resolved" : " Ongoing"}
                </Text>
              </Text>
              <Text style={styles.cardCategory}>
                Category:
                <Text
                  style={{
                    color:
                      disaster.category === "Danger"
                        ? "red"
                        : disaster.category === "Watchout"
                        ? "orange"
                        : "green",
                  }}
                >
                  {disaster.category}
                </Text>
              </Text>
              <Text style={styles.cardDistance}>
                Distance:{" "}
                {disaster.distance
                  ? `${(disaster.distance / 1000).toFixed(2)} km`
                  : "Within radius"}
              </Text>
              <View style={styles.cardFooter}>
                <TouchableOpacity
                  onPress={() => router.push("/map")}
                  style={styles.mapIconWrapper}
                >
                  <Image source={icons.Map} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Confirm Action",
                      "Are you sure you want to report yourself as a victim for this disaster?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Action Cancelled"),
                          style: "cancel",
                        },
                        {
                          text: "Confirm",
                          onPress: async () => {
                            try {
                              const token = await AsyncStorage.getItem("token");
                              await axios.post(
                                "http://192.168.1.101:8080/api/users/add-victim",
                                { disasterId: disaster.id },
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              );
                              router.push("/home");
                            } catch (error) {
                              console.error("Error reporting victim:", error);
                              Alert.alert(
                                "Error",
                                "Failed to report victim. Please try again."
                              );
                            }
                          },
                        },
                      ]
                    );
                  }}
                  style={styles.victimButton}
                >
                  <Text style={styles.victimButtonText}>I am a victim</Text>
                  <Image source={icons.Victim} style={styles.victimIcon} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => router.push("/home/disasters/donations")}
        >
          <Text style={styles.donateButtonText}>Donate</Text>
          <Image source={icons.Donate} style={styles.donateIcon} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  headerBackgroundImage: {
    width: "100%",
    height: height * 0.25,
    alignItems: "center",
  },
  headerContent: {
    alignItems: "center",
    paddingVertical: 10,
  },
  logo: {
    width: width * 0.6,
    height: height * 0.12,
    marginTop: height * 0.05,
    resizeMode: "contain",
  },
  disasterImageContainer: {
    marginLeft: "5%",
    width: "90%",
    alignItems: "center",
    marginTop: -80,
    paddingTop: 20,
    position: "relative",
  },
  imageWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  disasterImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  textOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  disastersHeaderText: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#FF9900",
    textAlign: "center",
  },
  disastersHeaderSubText: {
    fontSize: width * 0.035,
    color: "#FFF",
    textAlign: "center",
    marginTop: 5,
  },
  scrollViewContent: {
    alignItems: "center",
    paddingVertical: 10,
  },
  cardCategory: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  cardContainer: {
    width: "90%",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardStatus: {
    fontSize: width * 0.04,
    color: "#333",
    marginBottom: 10,
  },
  cardDistance: {
    fontSize: width * 0.035,
    marginTop: 5,
    color: '#555',
  },
  statusAvailable: {
    color: "green",
  },
  statusUnavailable: {
    color: "red",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  mapIconWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  victimButton: {
    backgroundColor: "#000",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  victimButtonText: {
    color: "#fff",
    fontSize: width * 0.035,
    marginRight: 5,
  },
  victimIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  donateButton: {
    backgroundColor: "#FF9900",
    borderRadius: 30,
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  donateButtonText: {
    color: "#fff",
    fontSize: width * 0.06,
    fontWeight: "bold",
    textAlign: "center",
  },
  donateIcon: {
    width: 50,
    height: 45,
    resizeMode: "contain",
    marginBottom: 12,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
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

export default DisastersScreen;
