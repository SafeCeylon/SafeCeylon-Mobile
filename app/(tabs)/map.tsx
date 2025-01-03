import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import MapView, { Marker, Polygon } from 'react-native-maps';
import axios from 'axios';
import icons from '@/constants/Icons';
import { useRouter } from 'expo-router';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import hurricane from '@/assets/images/icons/hurricane.png';
import flood from '@/assets/images/icons/flood.png';
import landslide from '@/assets/images/icons/landslide.png';

// Define TypeScript types
interface Disaster {
  latitude: number;
  longitude: number;
  radius: number;
  type: string;
}

interface Hospital {
  latitude: number;
  longitude: number;
  name: string;
}

interface Shelter {
  latitude: number;
  longitude: number;
  name: string;
}

const MapPage: React.FC = () => {
    const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [selectedDisaster, setSelectedDisaster] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: Double;
    longitude: Double;
  } | null>(null);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const performSearch = () => {
    if (searchText.trim() === '') {
      Alert.alert('Search Error', 'Please enter a search term.');
      return;
    }
    Alert.alert('Search', `Searching for: ${searchText}`);
  };

  const handleDisasterSelection = (disaster: string) => {
    setSelectedDisaster(disaster);
  };

  const proceedToLocationPicker = () => {
    if (!selectedDisaster) {
      Alert.alert('Error', 'Please select a disaster type.');
      return;
    }
    setLocationPickerVisible(true);
    setModalVisible(false);
  };

  const handleMapPress = (event: any) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const submitDisasterReport = async () => {
    if (!selectedDisaster || !selectedLocation) {
      Alert.alert('Error', 'Please select a disaster type and location.');
      return;
    }

    try {
      const disasterData = {
        type: selectedDisaster,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      }
      const response = await axios.post('http://192.168.1.14:8080/api/users/report-disaster', disasterData);

      if (response.status === 200) {
        Alert.alert('Success', 'Disaster report submitted successfully!');
        setLocationPickerVisible(false);
        setSelectedLocation(null);
        setSelectedDisaster('');
        router.push('/home');
      } else {
        Alert.alert('Error', 'An error occurred while submitting the report.');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred.');
      }
    }
  };


  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.get('http://192.168.1.14:8080/api/users/map');
        if (response.status === 200) {
          const { disasters, hospitals, shelters } = response.data;
          setDisasters(disasters || []);
          setHospitals(hospitals || []);
          setShelters(shelters || []);
        } else {
          Alert.alert('Error', 'Unable to fetch map data.');
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error('Unknown error:', error);
        }
      }
    };

    fetchMapData();
  }, []);

  const generateCirclePoints = (latitude: number, longitude: number, radius: number, points = 36) => {
    const earthRadius = 6371000; // Earth radius in meters
    const circlePoints = [];
    const lat = (latitude * Math.PI) / 180;
    const lng = (longitude * Math.PI) / 180;
  
    for (let i = 0; i <= points; i++) {
      const angle = (i * 360) / points;
      const angleRad = (angle * Math.PI) / 180;
  
      const latOffset = Math.asin(
        Math.sin(lat) * Math.cos(radius / earthRadius) +
        Math.cos(lat) * Math.sin(radius / earthRadius) * Math.cos(angleRad)
      );
      const lngOffset =
        lng +
        Math.atan2(
          Math.sin(angleRad) * Math.sin(radius / earthRadius) * Math.cos(lat),
          Math.cos(radius / earthRadius) - Math.sin(lat) * Math.sin(latOffset)
        );
  
      circlePoints.push({
        latitude: (latOffset * 180) / Math.PI,
        longitude: (lngOffset * 180) / Math.PI,
      });
    }
    return circlePoints;
  };
  

  const getDisasterColors = (type: string) => {
    switch (type) {
      case 'Flood':
        return { fillColor: 'rgba(0, 0, 255, 0.2)', strokeColor: 'rgba(0, 0, 255, 0.7)' }; // Light blue
      case 'Hurricane':
        return { fillColor: 'rgba(0, 0, 0, 0.2)', strokeColor: 'rgba(0, 0, 0, 0.6)' }; // Light gray
      case 'Landslide':
        return { fillColor: 'rgba(210, 180, 140, 0.5)', strokeColor: 'rgba(210, 180, 140, 1)' }; // Light brown
      default:
        return { fillColor: 'rgba(0, 0, 0, 0.2)', strokeColor: 'rgba(0, 0, 0, 0.8)' };
    }    
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 7.8731,
          longitude: 80.7718,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
        onPress={locationPickerVisible ? handleMapPress : undefined}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}

        {disasters.map((disaster, index) => {
          const { latitude, longitude, radius, type } = disaster;
          const { fillColor, strokeColor } = getDisasterColors(type);
          const circlePoints = generateCirclePoints(latitude, longitude, radius);

          // Determine the disaster icon based on type
          const disasterIcon =
            type === 'Flood' ? flood :
            type === 'Hurricane' ? hurricane :
            type === 'Landslide' ? landslide : null;

          return (
            <React.Fragment key={index}>
              {/* Draw the disaster area */}
              <Polygon
                coordinates={circlePoints}
                fillColor={fillColor}
                strokeColor={strokeColor}
                strokeWidth={2}
              />

              {/* Place the disaster icon in the center */}
              {disasterIcon && (
                <Marker
                  coordinate={{ latitude, longitude }}
                  anchor={{ x: 0.5, y: 0.5 }} // Center the icon
                >
                  <Image source={disasterIcon} style={{ width: 30, height: 30 }} />
                </Marker>
              )}
            </React.Fragment>
          );
        })}

        {hospitals.map((hospital, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: hospital.latitude, longitude: hospital.longitude }}
            title={hospital.name}
            description="Hospital"
            icon={icons.Hospital}
          />
        ))}

        {shelters.map((shelter, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: shelter.latitude, longitude: shelter.longitude }}
            title={shelter.name}
            description="Shelter"
            pinColor="orange"
            icon={icons.Shelter}
          />
        ))}
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search locations..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => Alert.alert('Search', searchText)}>
          <FontAwesome5 name="search" size={18} color="#007B70" />
        </TouchableOpacity>
      </View>
      {/* Add Disaster Button (hidden when in modal or location picker) */}
      {!modalVisible && !locationPickerVisible && (
        <TouchableOpacity
          style={styles.disasterButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.disasterButtonText}>Add Disaster</Text>
        </TouchableOpacity>
      )}

      {/* Disaster Type Selection Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Disaster Type</Text>
            {['Flood', 'Hurricane', 'Landslide'].map((disaster) => (
              <TouchableOpacity
                key={disaster}
                style={[
                  styles.disasterOption,
                  selectedDisaster === disaster && styles.selectedDisasterOption,
                ]}
                onPress={() => handleDisasterSelection(disaster)}
              >
                <Text
                  style={[
                    styles.disasterText,
                    selectedDisaster === disaster && styles.selectedDisasterText,
                  ]}
                >
                  {disaster}
                </Text>
              </TouchableOpacity>
            ))}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={proceedToLocationPicker}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Location Picker UI */}
      {locationPickerVisible && (
        <View style={styles.locationPicker}>
          <Text style={styles.pickerText}>
            Tap on the map to select a location
          </Text>
          {selectedLocation && (
            <Text style={styles.locationText}>
              Selected Location: {`Lat: ${selectedLocation.latitude}, Lng: ${selectedLocation.longitude}`}
            </Text>
          )}
          <View style={styles.pickerActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setLocationPickerVisible(false);
                setSelectedLocation(null);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitDisasterReport}
            >
              <Text style={styles.submitButtonText}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    searchContainer: {
      position: 'absolute',
      top: 50,
      left: 10,
      right: 10,
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 2,
    },
    searchBar: {
      flex: 1,
      backgroundColor: '#fff',
      borderColor: '#007B70',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      paddingRight: 40,
    },
    searchButton: {
      position: 'absolute',
      right: 20,
      top: '50%',
      transform: [{ translateY: -9 }],
      justifyContent: 'center',
      alignItems: 'center',
    },
    disasterButton: {
      position: 'absolute',
      bottom: 60,
      right: 20,
      backgroundColor: '#007B70',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    disasterButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    disasterOption: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#007B70',
      borderRadius: 5,
      marginBottom: 10,
      alignItems: 'center',
    },
    selectedDisasterOption: {
      backgroundColor: '#007B70',
    },
    disasterText: {
      color: '#007B70',
      fontSize: 16,
    },
    selectedDisasterText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
    },
    cancelButton: {
      flex: 1,
      marginRight: 5,
      backgroundColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: '#000',
      fontSize: 16,
    },
    nextButton: {
      flex: 1,
      marginLeft: 5,
      backgroundColor: '#007B70',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    nextButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    locationPicker: {
      position: 'absolute',
      bottom: 100,
      left: 10,
      right: 10,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      alignItems: 'center',
    },
    pickerText: {
      fontSize: 16,
      marginBottom: 10,
    },
    locationText: {
      fontSize: 14,
      marginBottom: 10,
    },
    pickerActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    submitButton: {
      flex: 1,
      backgroundColor: '#007B70',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginLeft: 5,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    }
  });
export default MapPage;
