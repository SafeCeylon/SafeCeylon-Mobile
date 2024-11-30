import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import axios from 'axios';

const MapPage: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
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
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search locations..."
          value={searchText}
          onChangeText={handleSearchChange}
        />
        <TouchableOpacity style={styles.searchButton} onPress={performSearch}>
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
  },
});

export default MapPage;
