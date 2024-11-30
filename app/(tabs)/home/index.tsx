import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import images from "@/constants/Images";
import { useRouter } from "expo-router";
import moment from "moment";

const { width, height } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [weather, setWeather] = useState({
    temperature: "27",
    condition: "",
    precipitation: "3.7",
    humidity: "83",
    wind: "33",
  });

  const [dateTime, setDateTime] = useState({
    currentDay: moment().format("dddd"),
    currentTime: moment().format("h:mm a"),
  });

  useEffect(() => {
    // Fetch weather data using Google Weather API
    // const fetchWeather = async () => {
    //   try {
    //     const response = await fetch("YOUR_GOOGLE_WEATHER_API_URL");
    //     const data = await response.json();
    //     setWeather({
    //       temperature: `${data.current.temp_c}`,
    //       condition: data.current.condition.text,
    //       precipitation: `${data.current.precip_mm}`,
    //       humidity: `${data.current.humidity}`,
    //       wind: `${data.current.wind_kph}`,
    //     });
    //   } catch (error) {
    //     console.error("Error fetching weather data:", error);
    //   }
    // };

    // fetchWeather();

    const intervalId = setInterval(() => {
      setDateTime({
        currentDay: moment().format("dddd"),
        currentTime: moment().format("h:mm a"),
      });
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
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

      <View style={styles.weatherContainer}>
        <View style={styles.weatherBackground}>
          <View style={styles.weatherInfoContainer}>
            <Image source={images.weather} style={styles.weatherIcon} />
            <View style={styles.weatherDetailsContainer}>
              <Text style={styles.weatherTemp}>{weather.temperature} °C</Text>
              <Text style={styles.weatherCondition}>{weather.condition}</Text>
              <Text style={styles.weatherDetails}>
                Precipitation: {weather.precipitation} mm
              </Text>
              <Text style={styles.weatherDetails}>
                Humidity: {weather.humidity} %
              </Text>
              <Text style={styles.weatherDetails}>
                Wind: {weather.wind} km/h
              </Text>
            </View>
          </View>
          <View style={styles.weatherDateContainer}>
            <Text style={styles.weatherToday}>Today</Text>
            <Text style={styles.weatherDay}>{dateTime.currentDay}</Text>
            <Text style={styles.weatherTime}>{dateTime.currentTime}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/home/weather")}
        >
          <Image source={images.weather} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Weather Forecasts</Text>
            <Text style={styles.cardDescription}>
              View public weather, Marine weather, City forecasts, 9 day weather
              forecast, Weekly weather.
            </Text>
          </View>
          <View style={styles.arrowContainer}>
            <FontAwesome5 name="chevron-right" size={24} color="#000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/home/disasters")}
        >
          <Image source={images.disaster} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Disasters</Text>
            <Text style={styles.cardDescription}>
              Manage user reports, View DMC reports, View hospitals, shelters
              locations and Avoid disasters.
            </Text>
          </View>
          <View style={styles.arrowContainer}>
            <FontAwesome5 name="chevron-right" size={24} color="#000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/home/disaster-predictions")}
        >
          <Image source={images.predictions} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Disaster Predictions</Text>
            <Text style={styles.cardDescription}>
              View disaster prediction locations, mainly Floods, Landslides,
              Hurricanes.
            </Text>
          </View>
          <View style={styles.arrowContainer}>
            <FontAwesome5 name="chevron-right" size={24} color="#000" />
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.sosButton}
        onPress={() => router.push("/home/sos")}
      >
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "space-between",
  },
  headerBackgroundImage: {
    width: "100%",

    height: height * 0.3,

    // justifyContent: "center",

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

  weatherContainer: {
    position: "absolute",

    top: height * 0.2, // Adjust this value as needed to create the overlap

    width: "100%",

    alignItems: "center",

    zIndex: 2,
  },

  weatherBackground: {
    backgroundColor: "#fff",

    borderRadius: 10,

    padding: 10,

    width: "90%",

    zIndex: 1,

    shadowColor: "#000",

    shadowOffset: { width: 0, height: 2 },

    shadowOpacity: 0.2,

    shadowRadius: 4,

    elevation: 5, // Add this for Android shadow

    flexDirection: "row",

    justifyContent: "space-between",
  },

  weatherInfoContainer: {
    flexDirection: "row",

    alignItems: "center",
  },

  weatherIcon: {
    width: width * 0.1,

    height: width * 0.1,

    marginRight: 10,
  },

  weatherDetailsContainer: {
    alignItems: "flex-start",
  },

  weatherTemp: {
    color: "#333",

    fontSize: width * 0.09,

    fontWeight: "bold",
  },

  weatherCondition: {
    color: "#333",

    fontSize: width * 0.045,
  },

  weatherDetails: {
    color: "#777",

    fontSize: width * 0.035,
  },

  weatherDateContainer: {
    alignItems: "flex-end",
  },

  weatherToday: {
    color: "#333",

    fontSize: width * 0.045,

    fontWeight: "bold",
  },

  weatherDay: {
    color: "#777",

    fontSize: width * 0.04,
  },

  weatherTime: {
    color: "#777",

    fontSize: width * 0.04,
  },

  cardContainer: {
    flex: 1,

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: height * 0.08, // Adjust this value to position the cards correctly below the weather container
  },

  card: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#fff",

    marginVertical: 5,

    borderRadius: 10,

    shadowColor: "#000",

    shadowOpacity: 0.2,

    shadowRadius: 4,

    shadowOffset: { width: 0, height: 2 },

    elevation: 5, // Add this for Android shadow

    width: "90%",

    height: height * 0.15,

    padding: 0,
  },

  cardImage: {
    width: "100%",

    height: "100%",

    borderRadius: 10,

    position: "absolute",

    top: 0,

    left: 0,
  },

  cardContent: {
    flex: 1,

    paddingHorizontal: width * 0.08,

    paddingVertical: 10,

    zIndex: 1,

    marginRight: width * 0.1,
  },

  cardTitle: {
    fontSize: width * 0.06,

    fontWeight: "bold",

    marginBottom: 10,

    color: "#FF9900",
  },

  cardDescription: {
    fontSize: width * 0.035,

    color: "#fff",
  },

  arrowContainer: {
    backgroundColor: "#fff",

    width: width * 0.12,

    height: "100%",

    justifyContent: "center",

    alignItems: "center",

    borderTopRightRadius: 10,

    borderBottomRightRadius: 10,

    position: "absolute",

    right: 0,
  },

  sosButton: {
    backgroundColor: "#FF9900",

    borderRadius: 30,

    paddingVertical: 5,

    paddingHorizontal: 5,

    marginVertical: 20,

    alignSelf: "center",

    shadowColor: "#000",

    shadowOffset: { width: 0, height: 2 },

    shadowOpacity: 0.2,

    shadowRadius: 4,

    elevation: 5, // Add this for Android shadow
  },

  sosText: {
    color: "#fff",

    fontSize: width * 0.06,

    fontWeight: "bold",

    borderRadius: 30,

    paddingVertical: 5,

    paddingHorizontal: 50,

    borderWidth: 2,

    borderColor: "#fff",
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

export default HomeScreen;
