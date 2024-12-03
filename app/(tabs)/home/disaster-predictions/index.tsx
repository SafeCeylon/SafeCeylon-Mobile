import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import MapView, { Polygon } from "react-native-maps";
import logo from "@/assets/images/Logo3.png";
import backgroundImage from "@/assets/images/defaultBGclipped.png";
import disasterIcon from "@/assets/images/disaster.png";
import { useRouter } from "expo-router";
import dsdData from "@/constants/dsdData";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import floodWarning from "@/assets/images/uploads/warning.png";

const disasterData = {
  Colombo: { aqi: 0},
  Kandy: { aqi: 0},
  Galle: { aqi: 0},
  Jaffna: { aqi: 0},
  Matara: { aqi: 0},
  Trincomalee: { aqi: 0},
  Anuradhapura: { aqi: 0},
  Polonnaruwa: { aqi: 0},
  Kurunegala: { aqi: 0},
  Ratnapura: { aqi: 0},
  Badulla: { aqi: 0},
  Batticaloa: { aqi: 0},
  Ampara: { aqi: 0},
  Hambantota: { aqi: 0},
  Matale: { aqi: 0},
  Monaragala: { aqi: 0},
  NuwaraEliya: { aqi: 0},
  Puttalam: { aqi: 0},
  Kegalle: { aqi: 0},
  Vavuniya: { aqi: 0},
  Mannar: { aqi: 0},
  Mullaitivu: { aqi: 0},
  Kilinochchi: { aqi: 0},
  Kalutara: { aqi: 0},
  Gampaha: { aqi: 0},
};

const DisasterPrediction: React.FC = () => {
  const router = useRouter();
  const [selectedDisaster, setSelectedDisaster] = useState("Landslide");
  const [selectedDistrict, setSelectedDistrict] = useState("Colombo");
  const [polygons, setPolygons] = useState({});
  const generatePolygons = (sdDivisionColorMap, dsdData) => {
    const polygons = {};
    sdDivisionColorMap.forEach(({ divisionalSecretariatDivision, color }) => {
      // Find the corresponding coordinates for the division from dsdData
      const divisionCoordinates = dsdData[divisionalSecretariatDivision];
      if (divisionCoordinates) {
        // Map the coordinates to the required structure
        const formattedCoordinates = divisionCoordinates[0][0].map(
          ([longitude, latitude]) => ({
            latitude,
            longitude,
          })
        );

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
    disasterData.forEach((entry) => {
      const { district, divisionalSecretariatDivisions, warningLevel } = entry;
      const divisions = divisionalSecretariatDivisions.split(" "); // Split SD Divisions by spaces
      const color = getColorForWarningLevel(warningLevel); // Determine the color based on warning level
      // Map each SD Division to its color
      divisions.forEach((division) => {
        sdDivisionColorMap.push({
          divisionalSecretariatDivision: division,
          color,
        });
      });
    });

    const generatedPolygons = generatePolygons(sdDivisionColorMap, dsdData);
    setPolygons(generatedPolygons);

    return sdDivisionColorMap;
  };

  // Helper function to assign colors based on warning level

  const getColorForWarningLevel = (warningLevel) => {
    switch (warningLevel) {
      case "Level 1 (Yellow)":
        return "#FFFF00"; // Yellow

      case "Level 2 (Amber)":
        return "#FFBF00"; // Amber

      case "Level 3 (Red)":
        return "#FF0000"; // Red

      default:
        return "#000000"; // Default color (Black)
    }
  };

  // Example of using it with the fetched data

  const fetchDisasterData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.14:8080/api/users/disaster-data"
      );
      const fetchedDisasterData = await response.data;

      const airQualityResponse = await axios.get("http://192.168.1.14:8080/api/users/air-quality");
      const fetchedAirQualityData = await airQualityResponse.data;
      console.log("Air Quality Data:", fetchedAirQualityData);

      fetchedAirQualityData.forEach((entry) => {
        const districtName = entry.district;
        const aqiValue = entry.aqi;
  
        // Normalize district names for consistent key matching
        const normalizedDistrictName = districtName.replace(/\s+/g, '');
  
        if (disasterData[normalizedDistrictName]) {
          // Update existing district's AQI
          disasterData[normalizedDistrictName].aqi = aqiValue;
        } else {
          // Add new district to disasterData
          disasterData[normalizedDistrictName] = { aqi: aqiValue };
        }
      });

      processDisasterData(fetchedDisasterData);
    } catch (error) {
      console.error("Error fetching disaster data:", error);
    }
  };

  useEffect(() => {
    fetchDisasterData();
  }, []);

  const districts = [
    "Colombo",
    "Kandy",
    "Galle",
    "Jaffna",
    "Gampaha",
    "Matara",
    "Kurunegala",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Hambantota",
    "Kilinochchi",
    "Mannar",
    "Matale",
    "Monaragala",
    "Mullaitivu",
    "NuwaraEliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
    "Kegalle",
    "Kalutara",
    "Ampara",
  ];

  const renderPolygons = () => {
    if (!polygons || Object.keys(polygons).length === 0) return null;
    return Object.keys(polygons).map((districtKey, index) => {
      const district = polygons[districtKey];
      return district.map((polygon, polyIndex) => (
        <Polygon
          key={`${districtKey}-${polyIndex}`}
          coordinates={polygon.coordinates}
          fillColor={polygon.fillColor || "#FF0000"}
          strokeColor={polygon.strokeColor || "#FF0000"}
          strokeWidth={2}
        />
      ));
    });
  };

  const getAirQualityInfo = (airPurity: number) => {
    if (airPurity <= 50) {
      return { color: "#00E400", level: "Good" }; // Green - Good
    } else if (airPurity <= 100) {
      return { color: "#FFFF00", level: "Moderate" }; // Yellow - Moderate
    } else if (airPurity <= 150) {
      return { color: "#FF7E00", level: "Unhealthy for Sensitive Groups" }; // Orange - Unhealthy for Sensitive Groups
    } else if (airPurity <= 200) {
      return { color: "#FF0000", level: "Unhealthy" }; // Red - Unhealthy
    } else if (airPurity <= 300) {
      return { color: "#8F3F97", level: "Very Unhealthy" }; // Purple - Very Unhealthy
    } else {
      return { color: "#7E0023", level: "Hazardous" }; // Maroon - Hazardous
    }
  };

  const renderWarningLevels = () => {
    if (selectedDisaster === "Air Quality") {
      const { aqi} = disasterData[selectedDistrict];
      const { color, level } = getAirQualityInfo(aqi);
      return (
        <View style={styles.warningContainer}>
          <View style={[styles.warningBox, { backgroundColor: color }]}>
            <Text style={styles.warningText}>Air Quality Level: {level}</Text>
            <Text style={styles.warningText}>SL AQI Value: {aqi}</Text>
          </View>
        </View>
      );
    } else if ( selectedDisaster === "Floods" ) {
      return (
        <View style={styles.imageContainer}>
          <View style={styles.warningBox}>
              <Image
                source={floodWarning}
                style={styles.warningImage}
                resizeMode="contain"
              />
          </View>
        </View>
      );
    }
    return null;
  };

  const renderMap = () => {
    const mapRegion = {
      latitude: 7.8731,
      longitude: 80.7718,
      latitudeDelta: 3.2,
      longitudeDelta: 3.2,
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
        <View style={styles.imageWrapper}>
          <Image source={disasterIcon} style={styles.disasterImage} />

          <View style={styles.textOverlay}>
            <Text style={styles.disastersHeaderText}>Disaster Predictions</Text>

            <Text style={styles.disastersHeaderSubText}>
              Stay informed about potential natural disasters in your area.
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.dropdownContainer}>
          <LinearGradient
            colors={["#007B70", "#00E1CD"]}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradient}
          >
            <Picker
              selectedValue={selectedDisaster}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setSelectedDisaster(itemValue);

                if (itemValue !== "Landslide") {
                  setSelectedDistrict("Colombo"); // Reset district if not Landslide
                }
              }}
            >
              <Picker.Item label="Landslide" value="Landslide" />

              <Picker.Item label="Air Quality" value="Air Quality" />

              <Picker.Item label="Floods" value="Floods" />
            </Picker>
          </LinearGradient>
        </View>

        {selectedDisaster === "Air Quality" && (
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

        {selectedDisaster != "Landslide" && renderWarningLevels()}

        {selectedDisaster === "Landslide" && renderMap()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f5f5f5",
  },

  headerBackgroundImage: {
    width: "100%",

    height: 200,
  },

  headerContent: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    marginTop: 10,
  },

  gradient: {
    borderRadius: 10,

    paddingHorizontal: 10,
  },

  logo: {
    width: 350,

    height: 50,

    marginBottom: 30,

    resizeMode: "contain",
  },

  disasterImageContainer: {
    marginLeft: "5%",

    width: "90%",

    alignItems: "center",

    marginTop: -80,

    paddingVertical: 20,

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
    fontSize: 25,

    fontWeight: "bold",

    color: "#FF9900",

    textAlign: "center",
  },

  disastersHeaderSubText: {
    fontSize: 16,

    color: "#FFF",

    textAlign: "center",

    marginTop: 5,
  },

  scrollContainer: {
    justifyContent: "center",

    alignItems: "center",
  },

  dropdownContainer: {
    width: "90%",

    backgroundColor: "#000",

    borderRadius: 10,

    marginVertical: 10,

    shadowColor: "#000",

    shadowOffset: { width: 0, height: 2 },

    shadowOpacity: 0.2,

    shadowRadius: 4,

    elevation: 5,
  },

  pickerWrapper: {
    backgroundColor: "#00AF9A",

    borderRadius: 5,
  },

  picker: {
    height: 50,

    width: "100%",

    color: "#fff",
  },

  warningContainer: {
    width: "90%",

    marginTop: 20,
  },

  warningBox: {
    padding: 10,

    borderRadius: 10,

    marginBottom: 10,
  },

  warningText: {
    fontSize: 16,

    fontWeight: "bold",
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
    backgroundColor: "#fff",

    borderRadius: 10,

    marginVertical: 10,

    shadowColor: "#000",

    shadowOpacity: 0.1,

    shadowRadius: 10,

    shadowOffset: { width: 0, height: 5 },

    width: "90%",

    padding: 10,
  },

  cardTitle: {
    fontSize: 18,

    fontWeight: "bold",

    marginBottom: 5,
  },

  cardDescription: {
    fontSize: 14,

    marginBottom: 10,
  },

  disasterImageDetail: {
    width: "100%",

    height: 200,

    resizeMode: "contain",

    marginBottom: 10,
  },

  mapContainer: {
    width: "90%",

    height: 380,

    marginTop: 20,

    borderRadius: 10,

    overflow: "hidden",
  },

  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
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
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  imageText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  warningImage: {
    width: 500,
    height: 600,
  },

});

export default DisasterPrediction;
