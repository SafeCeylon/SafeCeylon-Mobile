import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import images from "@/constants/Images";
import { useRouter } from "expo-router";
import moment from "moment";
import * as Location from "expo-location";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const API_KEY = "89db5eb089dbdc51aa2826344d81e51d";

const { width, height } = Dimensions.get("window");
type Weather = {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    main: string;
  };
  wind: {
    speed: number;
  };
};

const weatherIcons: { [key: string]: any } = {
  Thunderstorm: require("@/assets/images/weather/thunderstorm.png"),
  Drizzle: require("@/assets/images/weather/drizzle.png"),
  Rain: require("@/assets/images/weather/rain.png"),
  Snow: require("@/assets/images/weather/snow.png"),
  Clear: require("@/assets/images/weather/clear.png"),
  Clouds: require("@/assets/images/weather/clouds.png"),
  // Mist: require("@/assets/images/weather/mist.png"), // Optional, add other conditions
  // Smoke: require("@/assets/images/weather/smoke.png"),
  // Haze: require("@/assets/images/weather/haze.png"),
  // Dust: require("@/assets/images/weather/dust.png"),
  // Fog: require("@/assets/images/weather/fog.png"),
  // Sand: require("@/assets/images/weather/sand.png"),
  // Ash: require("@/assets/images/weather/ash.png"),
  // Squall: require("@/assets/images/weather/squall.png"),
  // Tornado: require("@/assets/images/weather/tornado.png"),
};

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [weatherData, setWeatherData] = useState<Weather>();
  const [dateTime, setDateTime] = useState({
    currentDay: moment().format("dddd"),
    currentTime: moment().format("h:mm a"),
  });

  const fetchWeather = async () => {
    console.log("Fetching Weather Data");

    if (!location) {
      console.error("Location data not available");
      return;
    }
    // const lat = 5.9496;
    // const lon = 80.5469;
    const lat = location?.coords.latitude;
    const lon = location?.coords.longitude;

    try {
      const results = await fetch(
        `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await results.json();
      console.log(JSON.stringify(data, null, 2));
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (location) {
      console.log(location);
      fetchWeather();
    }
  }, [location]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime({
        currentDay: moment().format("dddd"),
        currentTime: moment().format("h:mm a"),
      });
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);

  if (!weatherData) {
    return <ActivityIndicator size="large" color="#FF9900" />;
  }

  const weatherCondition = weatherData.weather[0]?.main || "Clear";
  const weatherIcon = weatherIcons[weatherCondition] || weatherIcons["Clear"];

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
            <View style={styles.weatherIconContainer}>
              <Image source={weatherIcon} style={styles.weatherIcon} />
              <Text style={styles.weatherDetails2}>
                {weatherData.weather[0]?.main}
              </Text>
            </View>
            <View style={styles.weatherDetailsContainer}>
              <Text style={styles.weatherTemp}>
                {Math.floor(weatherData.main.temp)} °C
              </Text>
              <Text style={styles.weatherCondition}>
                Feels {weatherData.main.feels_like}°C
              </Text>
              <Text style={styles.weatherDetails}>
                Humidity: {weatherData.main.humidity} %
              </Text>
              <Text style={styles.weatherDetails}>
                Wind: {weatherData.wind.speed} km/h
              </Text>
            </View>
          </View>
          <View style={styles.weatherDateContainer}>
            <Text style={styles.weatherToday}>Today</Text>
            <Text style={styles.weatherDay}>{dateTime.currentDay}</Text>
            <Text style={styles.weatherTime}>{dateTime.currentTime}</Text>
            <Text style={styles.weatherTime}>{weatherData.name}</Text>
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
    width: width * 0.2,

    height: width * 0.25,

    marginRight: 10,

    resizeMode: "contain",
  },

  
  weatherIconContainer: {
    flexDirection: "column",  // Stack icon and text vertically
    alignItems: "center",  // Center the items horizontally within the container
    justifyContent: "center",
    marginRight: 10,  // Adjust space between icon and details
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
  weatherDetails2: {
    color: "#333",

    fontSize: width * 0.05,

    fontWeight: "bold",
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
