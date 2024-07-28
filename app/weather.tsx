import React, { useState, useEffect } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import logo from "../assets/images/Logo3.png";
import backgroundImage from "../assets/images/defaultBGclipped.png";
import weatherImage from "../assets/images/weather.png";
import rainfallImage0 from "../assets/images/rainfall/rainfall_0.png";
import rainfallImage1 from "../assets/images/rainfall/rainfall_1.png";
import rainfallImage2 from "../assets/images/rainfall/rainfall_2.png";
import rainfallImage3 from "../assets/images/rainfall/rainfall_3.png";
import rainfallImage4 from "../assets/images/rainfall/rainfall_4.png";
import rainfallImage5 from "../assets/images/rainfall/rainfall_5.png";
import rainfallImage6 from "../assets/images/rainfall/rainfall_6.png";
import rainfallImage7 from "../assets/images/rainfall/rainfall_7.png";
import rainfallImage8 from "../assets/images/rainfall/rainfall_8.png";
import temperatureImage0 from "../assets/images/temp/temp_0.png";
import temperatureImage1 from "../assets/images/temp/temp_1.png";
import temperatureImage2 from "../assets/images/temp/temp_2.png";
import temperatureImage3 from "../assets/images/temp/temp_3.png";
import temperatureImage4 from "../assets/images/temp/temp_4.png";
import temperatureImage5 from "../assets/images/temp/temp_5.png";
import temperatureImage6 from "../assets/images/temp/temp_6.png";
import temperatureImage7 from "../assets/images/temp/temp_7.png";
import temperatureImage8 from "../assets/images/temp/temp_8.png";
import tempIcon from "../assets/images/w_icons/clouds-and-sun.png";
import { useRouter } from "expo-router";

const MarineWeatherScreen: React.FC = () => {
  const router = useRouter();
  const [selectedWeather, setSelectedWeather] = useState("Marine Weather");
  const [hour, setHour] = useState(16); // Default to 4:00 PM
  const [dayOffset, setDayOffset] = useState(0); // Default to current day
  const [selectedDay, setSelectedDay] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dateRanges, setDateRanges] = useState<string[]>([]);

  const getDayName = (offset: number) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + offset);

    if (offset === 0) {
      return "Today";
    } else if (offset === 1) {
      return "Tomorrow";
    } else {
      const day = futureDate.getDate();
      const month = futureDate
        .toLocaleString("default", { month: "short" })
        .toUpperCase();
      return `${day} ${month}`;
    }
  };

  const handleHourChange = (increment: boolean) => {
    setHour((prevHour) => {
      const newHour = increment ? prevHour + 3 : prevHour - 3;
      return newHour < 0 ? 21 : newHour > 24 ? 0 : newHour;
    });
  };

  const handleDayChange = (increment: boolean) => {
    setDayOffset((prevDayOffset) => {
      const newDayOffset = increment ? prevDayOffset + 1 : prevDayOffset - 1;
      return newDayOffset < 0 ? 7 : newDayOffset > 7 ? 0 : newDayOffset;
    });
  };

  const dummyWeatherData = [
    "Clear Sky",
    "Partly Cloudy",
    "Mostly Cloudy",
    "Rain Showers",
    "Thunderstorms",
    "Sunny",
    "Overcast",
  ];

  const dummyTemperatureData = [30, 32, 28, 26, 25, 29, 27, 31, 33];

  useEffect(() => {
    const generateDateRanges = () => {
      const today = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
      };
      const timeRange = (date: Date) => {
        const tomorrow = new Date(date);
        tomorrow.setDate(date.getDate() + 1);
        return `${date.toLocaleDateString(
          "en-US",
          dateOptions
        )} 8.30AM - ${tomorrow.toLocaleDateString(
          "en-US",
          dateOptions
        )} 8.30AM`;
      };
      const ranges = Array.from({ length: 9 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return timeRange(date);
      });
      setDateRanges(ranges);
      setSelectedDay(ranges[0]); // Set the initial selected day
    };

    generateDateRanges();
  }, []);

  const rainfallImages = [
    rainfallImage0,
    rainfallImage1,
    rainfallImage2,
    rainfallImage3,
    rainfallImage4,
    rainfallImage5,
    rainfallImage6,
    rainfallImage7,
    rainfallImage8,
  ];

  const temperatureImages = [
    temperatureImage0,
    temperatureImage1,
    temperatureImage2,
    temperatureImage3,
    temperatureImage4,
    temperatureImage5,
    temperatureImage6,
    temperatureImage7,
    temperatureImage8,
  ];

  const forecastImages = [rainfallImages, temperatureImages];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2); // 0 for rainfall, 1 for temperature
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + 2) % 2); // 0 for rainfall, 1 for temperature
  };

  const selectedDayIndex = dateRanges.indexOf(selectedDay);

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

      <View style={styles.weatherImageContainer}>
        <Text style={styles.weatherTitle}>Weather Forecasts</Text>
        <View style={styles.imageWrapper}>
          <Image source={weatherImage} style={styles.weatherImage} />
        </View>
        <Text style={styles.weatherDescription}>
          View public weather, Marine weather, City forecasts, 9 day weather
          forecast, Weekly weather.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.dropdownContainer}>
      <LinearGradient
            colors={['#007B70', '#00E1CD']}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradient}
          >
            <Picker
              selectedValue={selectedWeather}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedWeather(itemValue)}
            >
              <Picker.Item label="Weather" value="Weather" />
              <Picker.Item label="Marine Weather" value="Marine Weather" />
              <Picker.Item label="City Forecast" value="City Forecast" />
              <Picker.Item label="9 Day Forecast" value="9 Day Forecast" />
            </Picker>
          </LinearGradient>
        </View>

        {selectedWeather === "Weather" && (
          <View style={styles.card}>
            <View style={styles.weatherContainer}>
              <Image source={tempIcon} style={styles.weatherIcon} />
              <Text style={styles.weatherInfo}>
                {dummyTemperatureData[hour / 3]}°C |{" "}
                {dummyWeatherData[hour / 3]}
              </Text>
              <Text style={styles.weatherDetails}>
                Today | Saturday | {hour}:00 PM
              </Text>
              <Text style={styles.weatherDetails}>
                Humidity: 55% | Wind: 23 km/h
              </Text>
            </View>

            <View style={styles.adjustContainer}>
              <TouchableOpacity
                onPress={() => handleHourChange(false)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.adjustLabel}>Adjust Hour: {hour}:00</Text>
              <TouchableOpacity
                onPress={() => handleHourChange(true)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.adjustContainer}>
              <TouchableOpacity
                onPress={() => handleDayChange(false)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.adjustLabel}>
                Adjust Day: {getDayName(dayOffset)}
              </Text>
              <TouchableOpacity
                onPress={() => handleDayChange(true)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dayTempContainer}>
              <Text style={styles.dayTemp}>
                {getDayName(dayOffset)}: Max {dummyTemperatureData[dayOffset]}°C
                | Min {dummyTemperatureData[(dayOffset + 1) % 9]}°C
              </Text>
            </View>
          </View>
        )}

        {selectedWeather === "Marine Weather" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Condition of Rain:</Text>
            <Text style={styles.cardDescription}>
              Showers will occur at several places in the sea areas off the
              coast extending from Colombo to Matara via Galle.
            </Text>

            <Text style={styles.cardTitle}>Winds:</Text>
            <Text style={styles.cardDescription}>
              Wind will be westerly to south-westerly and wind speed will be
              (30-40) kmph. Wind speed can increase up to 50 kmph at times in
              the sea areas off the coasts extending from Kankasanthurai to
              Puttalam via Mannar and from Hambantota to Pottuvil.
            </Text>

            <Text style={styles.cardTitle}>State of Sea:</Text>
            <Text style={styles.cardDescription}>
              The sea areas off the coasts extending from Trincomalee to
              Kankasanthurai via Mullaitivu and Puttalam to Hambantota via
              Colombo and Galle can be fairly rough at times.
            </Text>
          </View>
        )}

        {selectedWeather === "City Forecast" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Issued at 04.00 p.m. on 26 July 2024
            </Text>
            <Text style={styles.cardDescription}>
              Showers will occur at times in Sabaragamuwa province and in Kandy
              and Nuwara-Eliya districts. Several spells of showers will occur
              in Western and North-western provinces and in Galle and Matara
              districts.
            </Text>
            <Text style={styles.cardDescription}>
              Strong winds of about (50-55) kmph can be expected at times over
              Western slopes of the central hills and Northern, North-central
              and North-western provinces and in Trincomalee, Monaragala and
              Hambantota districts. Temporary strong winds (about 40-50) kmph
              can be expected during thundershowers elsewhere of the island.
            </Text>
          </View>
        )}

        {selectedWeather === "9 Day Forecast" && (
          <>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedDay}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedDay(itemValue)}
              >
                {dateRanges.map((range, index) => (
                  <Picker.Item label={range} value={range} key={index} />
                ))}
              </Picker>
            </View>

            <View style={styles.card}>
              <Text style={styles.imageType}>
                {currentImageIndex === 0 ? "Rainfall" : "Temperature"}
              </Text>
              <Image
                source={forecastImages[currentImageIndex][selectedDayIndex]}
                style={styles.forecastImage}
              />
              <View style={styles.imageNavigation}>
                <TouchableOpacity
                  onPress={handlePrevImage}
                  style={styles.arrowButton}
                >
                  <FontAwesome5 name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextImage}
                  style={styles.arrowButton}
                >
                  <FontAwesome5 name="arrow-right" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/dashboard")}
        >
          <FontAwesome5 name="home" size={24} color="#000" />
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
          <FontAwesome5 name="user" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
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
    height: 250,
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 250,
    marginBottom: 30,
    resizeMode: "contain",
  },

  weatherImageContainer: {
    marginLeft: "5%", // Adjust margin to give some padding from the sides
    width: "90%", // Adjust width to give some padding from the sides
    // justifyContent: 'center',
    alignItems: "center",
    marginTop: -80,
    paddingVertical: 20,
    position: "relative",
  },
  imageWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20, // Apply rounded edges
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden", // Ensure the image conforms to rounded edges
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
  },
  weatherImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover", // Use 'cover' to fill the container
  },
  weatherTitle: {
    position: "absolute",
    top: "35%", // Adjust top position to center relative to container
    fontSize: 24,
    color: "#FFD700",
    fontWeight: "bold",
    zIndex: 1,
    textAlign: "center", // Center text horizontally
  },
  weatherDescription: {
    position: "absolute",
    bottom: "30%", // Adjust bottom position to center relative to container
    fontSize: 14,
    color: "white",
    textAlign: "center", // Center text horizontally
    width: "90%", // Adjust width for better padding
    zIndex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 100,
  },
  dropdownContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,  
  },
  gradient: {
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    color: "#fff",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    width: "90%",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Add this for Android shadow
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
  forecastImage: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
  },
  imageType: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  imageNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  arrowButton: {
    padding: 10,
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
  weatherContainer: {
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  weatherIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  weatherInfo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  weatherDetails: {
    fontSize: 16,
    color: "#666",
  },
  adjustContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#333",
  },
  adjustLabel: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    flex: 1,
  },
  dayTempContainer: {
    marginTop: 20,
  },
  dayTemp: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default MarineWeatherScreen;
