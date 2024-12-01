
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import MapView, { Polygon } from 'react-native-maps';
import logo from '@/assets/images/Logo3.png';
import backgroundImage from '@/assets/images/defaultBGclipped.png';
import disasterIcon from '@/assets/images/disaster.png';
import { useRouter } from 'expo-router';
import dsdData from '@/constants/dsdData';
import axios from 'axios';

const DisasterPrediction: React.FC = () => {
  const router = useRouter();
  const [selectedDisaster, setSelectedDisaster] = useState('Landslide');
  const [selectedDistrict, setSelectedDistrict] = useState('Colombo');
  const [polygons, setPolygons] = useState({});


  const generatePolygons = (sdDivisionColorMap, dsdData) => {
    const polygons = {};
  
    sdDivisionColorMap.forEach(({ divisionalSecretariatDivision, color }) => {
      // Find the corresponding coordinates for the division from dsdData
      const divisionCoordinates = dsdData[divisionalSecretariatDivision];
  
      if (divisionCoordinates) {
        // Map the coordinates to the required structure
        const formattedCoordinates = divisionCoordinates[0][0].map(([longitude, latitude]) => ({
          latitude,
          longitude,
        }));
  
        // Add the formatted data to the polygons object
        polygons[divisionalSecretariatDivision] = [
          {
            coordinates: formattedCoordinates,
            strokeColor: color,
            fillColor: `${color}80`, // Assuming you want 50% opacity for the fill color
          },
        ];
      }
    });
  
    return polygons;
  };  

  const processDisasterData = (disasterData) => {
    const sdDivisionColorMap = [];
  
    // Loop through each data entry
    disasterData.forEach(entry => {
      const { district, divisionalSecretariatDivisions, warningLevel } = entry;
      const divisions = divisionalSecretariatDivisions.split(' '); // Split SD Divisions by spaces
      const color = getColorForWarningLevel(warningLevel); // Determine the color based on warning level
  
      // Map each SD Division to its color
      divisions.forEach(division => {
        sdDivisionColorMap.push({divisionalSecretariatDivision: division, color });
      });
    });

    const generatedPolygons = generatePolygons(sdDivisionColorMap, dsdData);
    setPolygons(generatedPolygons);
    return sdDivisionColorMap;
  };
  
  // Helper function to assign colors based on warning level
  const getColorForWarningLevel = (warningLevel) => {
    switch (warningLevel) {
      case 'Level 1 (Yellow)':
        return '#FFFF00'; // Yellow
      case 'Level 2 (Amber)':
        return '#FFBF00'; // Amber
      case 'Level 3 (Red)':
        return '#FF0000'; // Red
      default:
        return '#000000'; // Default color (Black)
    }
  };
  
  // Example of using it with the fetched data
  const fetchDisasterData = async () => { 
    try {
      const response = await axios.get('http://192.168.1.14:8080/api/users/disaster-data');
      const fetchedDisasterData = await response.data;
      
      // Process the fetched data
      processDisasterData(fetchedDisasterData);
    } catch (error) {
      console.error('Error fetching disaster data:', error);
    }
  };
  

  useEffect(() => {
    fetchDisasterData();
  }, []);

  const disasterData = {
    Landslide: {
      warnings: [
        { level: 'WATCH', color: '#FFFF00' },
        { level: 'ALERT', color: '#FFA500' },
        { level: 'EVACUATE', color: '#FF0000' },
      ],
    },
    AirQuality: {
      purity: {
        Colombo: { aqi: 51, pm: 25 },
        Kandy: { aqi: 48, pm: 24 },
        Galle: { aqi: 46, pm: 23 },
        Jaffna: { aqi: 34, pm: 17 },
        Matara: { aqi: 44, pm: 22 },
        Trincomalee: { aqi: 40, pm: 20 },
        Anuradhapura: { aqi: 56, pm: 28 },
        Polonnaruwa: { aqi: 30, pm: 15 },
        Kurunegala: { aqi: 46, pm: 23 },
        Ratnapura: { aqi: 42, pm: 21 },
        Badulla: { aqi: 54, pm: 27 },
        Batticaloa: { aqi: 48, pm: 24 },
        Ampara: { aqi: 42, pm: 21 },
        Hambantota: { aqi: 38, pm: 19 },
        Matale: { aqi: 40, pm: 20 },
        Monaragala: { aqi: 36, pm: 18 },
        NuwaraEliya: { aqi: 42, pm: 21 },
        Puttalam: { aqi: 48, pm: 24 },
        Kegalle: { aqi: 42, pm: 21 },
        Vavuniya: { aqi: 38, pm: 19 },
        Mannar: { aqi: 40, pm: 20 },
        Mullaitivu: { aqi: 36, pm: 18 },
        Kilinochchi: { aqi: 42, pm: 21 },
        Kalutara: { aqi: 46, pm: 23 },
        Gampaha: { aqi: 48, pm: 24 },
      },
    },
    Hurricane: {
      warnings: [
        { level: 'WATCH', color: '#FFFF00' },
        { level: 'ALERT', color: '#FFA500' },
        { level: 'EVACUATE', color: '#FF0000' },
      ],
    },
    Flood: {
      warnings: [
        { level: 'WATCH', color: '#FFFF00' },
        { level: 'ALERT', color: '#FFA500' },
        { level: 'EVACUATE', color: '#FF0000' },
      ],
    },
  };

  const districts = [
    'Colombo',
    'Kandy',
    'Galle',
    'Jaffna',
    'Gampaha',
    'Matara',
    'Kurunegala',
    'Anuradhapura',
    'Badulla',
    'Batticaloa',
    'Hambantota',
    'Kilinochchi',
    'Mannar',
    'Matale',
    'Monaragala',
    'Mullaitivu',
    'NuwaraEliya',
    'Polonnaruwa',
    'Puttalam',
    'Ratnapura',
    'Trincomalee',
    'Vavuniya',
    'Kegalle',
    'Kalutara',
    'Ampara',
  ];

  const renderPolygons = () => {
    if (!polygons || Object.keys(polygons).length === 0) return null;
    return Object.keys(polygons).map((districtKey, index) => {
      const district = polygons[districtKey];
      return district.map((polygon, polyIndex) => (
        <Polygon
          key={`${districtKey}-${polyIndex}`}
          coordinates={polygon.coordinates}
          fillColor={polygon.fillColor || '#FF0000'}
          strokeColor={polygon.strokeColor || '#FF0000'}
          strokeWidth={2}
        />
      ));
    });
  };

  const gnDivisionsDataHR = {
    Kandy: {
      WATCH: ['Katugastota', 'Peradeniya'],
    },
    Kurunegala: {
      WATCH: ['Wariyapola', 'Pannala'],
      ALERT: ['Hettipola', 'Bingiriya'],
    },
    Ratnapura: {
      WATCH: ['Pelmadulla', 'Kuruwita'],
      ALERT: ['Embilipitiya', 'Eheliyagoda'],
    },
    Badulla: {
      WATCH: ['Bandarawela', 'Haputale'],
    },
    NuwaraEliya: {
      WATCH: ['Hatton', 'Nanuoya'],
    },
    Kalutara: {
      WATCH: ['Beruwala', 'Panadura'],
      ALERT: ['Horana', 'Matugama'],
      EVACUATE: ['Aluthgama', 'Bandaragama'],
    },
    Gampaha: {
      WATCH: ['Negombo', 'Minuwangoda'],
      ALERT: ['Divulapitiya', 'Wattala'],
    },
  };

  const gnDivisionsDataFL = {
    Galle: {
      WATCH: ['Hikkaduwa', 'Unawatuna'],
    },
    Matara: {
      WATCH: ['Weligama', 'Deniyaya'],
    },
    Kurunegala: {
      WATCH: ['Wariyapola', 'Pannala'],
    },
    Ratnapura: {
      WATCH: ['Pelmadulla', 'Kuruwita'],
      ALERT: ['Embilipitiya', 'Eheliyagoda'],
    },
    Badulla: {
      WATCH: ['Bandarawela', 'Haputale'],
      ALERT: ['Welimada', 'Ella'],
      EVACUATE: ['Mahiyanganaya', 'Passara'],
    },
    Kegalle: {
      WATCH: ['Mawanella', 'Warakapola'],
      ALERT: ['Rambukkana', 'Yatiyanthota'],
    },
    Kalutara: {
      WATCH: ['Beruwala', 'Panadura'],
      ALERT: ['Horana', 'Matugama'],
      EVACUATE: ['Aluthgama', 'Bandaragama'],
    },
    Gampaha: {
      WATCH: ['Negombo', 'Minuwangoda'],
      ALERT: ['Divulapitiya', 'Wattala'],
      EVACUATE: ['Katana', 'Ragama'],
    },
  };

  const getAirQualityInfo = (airPurity: number) => {
    if (airPurity <= 50) {
      return { color: '#00E400', level: 'Good' }; // Green - Good
    } else if (airPurity <= 100) {
      return { color: '#FFFF00', level: 'Moderate' }; // Yellow - Moderate
    } else if (airPurity <= 150) {
      return { color: '#FF7E00', level: 'Unhealthy for Sensitive Groups' }; // Orange - Unhealthy for Sensitive Groups
    } else if (airPurity <= 200) {
      return { color: '#FF0000', level: 'Unhealthy' }; // Red - Unhealthy
    } else if (airPurity <= 300) {
      return { color: '#8F3F97', level: 'Very Unhealthy' }; // Purple - Very Unhealthy
    } else {
      return { color: '#7E0023', level: 'Hazardous' }; // Maroon - Hazardous
    }
  };

  const renderWarningLevels = () => {
    if (selectedDisaster === 'Landslide') {
      return (
        <View style={styles.warningContainer}>
          {disasterData.Landslide.warnings.map((warning, index) => (
            <View
              key={index}
              style={[styles.warningBox, { backgroundColor: warning.color }]}
            >
              <Text style={styles.warningText}>
                Warning Level: {warning.level}
              </Text>
            </View>
          ))}
        </View>
      );
    } else if (selectedDisaster === 'Air Quality') {
      const { aqi, pm } = disasterData.AirQuality.purity[selectedDistrict];
      const { color, level } = getAirQualityInfo(aqi);
      return (
        <View style={styles.warningContainer}>
          <View style={[styles.warningBox, { backgroundColor: color }]}>
            <Text style={styles.warningText}>Air Quality Level: {level}</Text>
            <Text style={styles.warningText}>Micro Particles: {pm} μg/m³</Text>
            <Text style={styles.warningText}>SL AQI Value: {aqi}</Text>
          </View>
        </View>
      );
    } else if (
      selectedDisaster === 'Hurricane' &&
      gnDivisionsDataHR[selectedDistrict]
    ) {
      return (
        <View style={styles.warningContainer}>
          {disasterData.Landslide.warnings.map((warning, index) => (
            <View
              key={index}
              style={[styles.warningBox, { backgroundColor: warning.color }]}
            >
              <Text style={styles.warningText}>
                Warning Level: {warning.level}
              </Text>
              {gnDivisionsDataHR[selectedDistrict][warning.level] && (
                <View style={styles.gnDivisionContainer}>
                  {gnDivisionsDataHR[selectedDistrict][warning.level].map(
                    (gnDivision, idx) => (
                      <Text key={idx} style={styles.gnDivisionText}>
                        {gnDivision}
                      </Text>
                    ),
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      );
    } else if (
      selectedDisaster === 'Floods' &&
      gnDivisionsDataFL[selectedDistrict]
    ) {
      return (
        <View style={styles.warningContainer}>
          {disasterData.Landslide.warnings.map((warning, index) => (
            <View
              key={index}
              style={[styles.warningBox, { backgroundColor: warning.color }]}
            >
              <Text style={styles.warningText}>
                Warning Level: {warning.level}
              </Text>
              {gnDivisionsDataFL[selectedDistrict][warning.level] && (
                <View style={styles.gnDivisionContainer}>
                  {gnDivisionsDataFL[selectedDistrict][warning.level].map(
                    (gnDivision, idx) => (
                      <Text key={idx} style={styles.gnDivisionText}>
                        {gnDivision}
                      </Text>
                    ),
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  const renderMap = () => {
    const mapRegion = {
      latitude: 7.8731,
      longitude: 80.7718,
      latitudeDelta: 2.8,
      longitudeDelta: 2.8,
    };

    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 7.8731,
            longitude: 80.7718,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }}
        >
          {renderPolygons()}
        </MapView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.headerBackgroundImage}
      >
        <View style={styles.headerContent}>
          <Image source={logo} style={styles.logo} />
        </View>
      </ImageBackground>

      <View style={styles.disasterImageContainer}>
        <Text style={styles.disasterTitle}>Disaster Predictions</Text>
        <Image source={disasterIcon} style={styles.disasterImage} />
        <Text style={styles.disasterDescription}>
          Stay informed about potential natural disasters in your area.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.dropdownContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedDisaster}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setSelectedDisaster(itemValue);
                if (itemValue !== 'Landslide') {
                  setSelectedDistrict('Colombo'); // Reset district if not Landslide
                }
              }}
            >
              <Picker.Item label="Landslide" value="Landslide" />
              <Picker.Item label="Air Quality" value="Air Quality" />
              <Picker.Item label="Hurricane" value="Hurricane" />
              <Picker.Item label="Floods" value="Floods" />
            </Picker>
          </View>
        </View>

        {selectedDisaster !== 'Landslide' && (
          <View style={styles.dropdownContainer}>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedDistrict}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
              >
                {districts.map((district, index) => (
                  <Picker.Item label={district} value={district} key={index} />
                ))}
              </Picker>
            </View>
          </View>
        )}

        {selectedDisaster != 'Landslide' && renderWarningLevels()}

        {selectedDisaster === 'Landslide' && renderMap()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerBackgroundImage: {
    width: '100%',
    height: 200,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 350,
    height: 50,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  disasterImageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -95,
    paddingVertical: 20,
    position: 'relative',
  },
  disasterImage: {
    width: 350,
    height: 150,
    borderRadius: 1000,
    resizeMode: 'contain',
  },
  disasterTitle: {
    position: 'absolute',
    top: 50,
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
    zIndex: 1,
  },
  disasterDescription: {
    position: 'absolute',
    bottom: 40,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    width: '80%',
    zIndex: 1,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: '90%',
    marginVertical: 10,
  },
  pickerWrapper: {
    backgroundColor: '#00AF9A',
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#fff',
  },
  warningContainer: {
    width: '90%',
    marginTop: 20,
  },
  warningBox: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  warningText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  districtText: {
    fontSize: 14,
    marginTop: 5,
  },
  gnDivisionContainer: {
    marginTop: 10,
  },
  gnDivisionText: {
    fontSize: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    width: '90%',
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  disasterImageDetail: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  mapContainer: {
    width: '90%',
    height: 600,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    right: -6,
    top: -5,
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 2,
    paddingHorizontal: 5,
  },
  notificationText: {
    color: '#fff',
    fontSize: 10,
  },
});

export default DisasterPrediction;
