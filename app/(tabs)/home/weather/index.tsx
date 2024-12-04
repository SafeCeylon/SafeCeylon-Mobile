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
import { LinearGradient } from 'expo-linear-gradient';
import MapView, {Marker} from 'react-native-maps';
import logo from '@/assets/images/Logo3.png';
import backgroundImage from '@/assets/images/defaultBGclipped.png';
import weatherImage from '@/assets/images/weather.png';
import rainfallImage0 from '@/assets/images/rainfall/rainfall_0.png';
import rainfallImage1 from '@/assets/images/rainfall/rainfall_1.png';
import rainfallImage2 from '@/assets/images/rainfall/rainfall_2.png';
import rainfallImage3 from '@/assets/images/rainfall/rainfall_3.png';
import rainfallImage4 from '@/assets/images/rainfall/rainfall_4.png';
import rainfallImage5 from '@/assets/images/rainfall/rainfall_5.png';
import rainfallImage6 from '@/assets/images/rainfall/rainfall_6.png';
import rainfallImage7 from '@/assets/images/rainfall/rainfall_7.png';
import rainfallImage8 from '@/assets/images/rainfall/rainfall_8.png';
import temperatureImage0 from '@/assets/images/temp/temp_0.png';
import temperatureImage1 from '@/assets/images/temp/temp_1.png';
import temperatureImage2 from '@/assets/images/temp/temp_2.png';
import temperatureImage3 from '@/assets/images/temp/temp_3.png';
import temperatureImage4 from '@/assets/images/temp/temp_4.png';
import temperatureImage5 from '@/assets/images/temp/temp_5.png';
import temperatureImage6 from '@/assets/images/temp/temp_6.png';
import temperatureImage7 from '@/assets/images/temp/temp_7.png';
import temperatureImage8 from '@/assets/images/temp/temp_8.png';
import Icons from '@/constants/Icons';
import { useRouter } from 'expo-router';
import districtData from '@/constants/districtData';
import axios from 'axios';

const Weather: React.FC = () => {
  const router = useRouter();
  const [selectedWeather, setSelectedWeather] = useState('Weather');
  const [selectedDay, setSelectedDay] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dateRanges, setDateRanges] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<any[]>([]); // Add state to store data

  const mergedWeatherData = weatherData.flatMap((item) => {

    const districts = item.district.trim().split(" "); // Split space-separated districts
    return districts.map((districtName: String) => {
      const districtCenter = districtData.find(
        (district) => district.district_name.toLowerCase() === districtName.toLowerCase()
      );
  
      if (districtCenter) {
        return {
          id: `${item.id}-${districtName}`,
          condition: item.condition,
          rainfallType: item.rainfallType,
          windSpeeds: item.windSpeeds,
          coordinates: districtCenter.center,
        };
      }
      return null;
    }).filter(Boolean);
  });

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://192.168.1.44:8080/api/users/get-weather');
      const weatherData = response.data;
      console.log('Fetched Weather Data:', weatherData);
      // Example: If you want to update a state with the fetched data
      setWeatherData(weatherData); // Use a state to store it
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    const generateDateRanges = () => {
      const today = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      };
      const timeRange = (date: Date) => {
        const tomorrow = new Date(date);
        tomorrow.setDate(date.getDate() + 1);
        return `${date.toLocaleDateString(
          'en-US',
          dateOptions,
        )} 8.30AM - ${tomorrow.toLocaleDateString(
          'en-US',
          dateOptions,
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

    fetchWeatherData();
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
        <View style={styles.imageWrapper}>
          <Image source={weatherImage} style={styles.weatherImage} />
          <View style={styles.textOverlay}>
            <Text style={styles.weatherTitle}>Weather Forecasts</Text>
            <Text style={styles.weatherDescription}>
              Stay informed about potential natural disasters in your area.
            </Text>
          </View>
        </View>
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
              <Picker.Item label="9 Day Forecast" value="9 Day Forecast" />
            </Picker>
          </LinearGradient>
        </View>

        {selectedWeather === 'Weather' && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 7.8731,
                longitude: 80.7718,
                latitudeDelta: 2.5,
                longitudeDelta: 2.5,
              }}
            >
              {mergedWeatherData.map((item) => (
                <Marker
                  key={item.id}
                  coordinate={item.coordinates}
                  title={item.condition}
                  description={`Rainfall type: ${item.rainfallType}, Wind speeds: ${item.windSpeeds} kmph`}
                >

                  <View style={styles.iconContainer}>
                    <Image
                      source={Icons[item.rainfallType]}
                      style={styles.icon}
                      resizeMode="contain"
                    />
                  </View>
                </Marker>
              ))}
            </MapView>
        </View>
        )}

        {selectedWeather === 'Marine Weather' && (
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

        {selectedWeather === '9 Day Forecast' && (
          <>
            <View style={styles.dropdownContainer}>
              <LinearGradient
                colors={['#007B70', '#00E1CD']}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.gradient}
              >
                <Picker
                  selectedValue={selectedDay}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedDay(itemValue)}
                >
                  {dateRanges.map((range, index) => (
                    <Picker.Item label={range} value={range} key={index} />
                  ))}
                </Picker>
              </LinearGradient>
            </View>

            <View style={styles.card}>
              <Text style={styles.imageType}>
                {currentImageIndex === 0 ? 'Rainfall' : 'Temperature'}
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
    height: 250,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 250,
    marginBottom: 30,
    resizeMode: 'contain',
  },

  weatherImageContainer: {
    marginLeft: '5%',
    width: '90%',
    alignItems: 'center',
    marginTop: -80,
    paddingVertical: 20,
    position: 'relative',
  },
  imageWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover', // Use 'cover' to fill the container
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  weatherTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FF9900',
    textAlign: 'center',
  },
  weatherDescription: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 100,
  },
  dropdownContainer: {
    width: '90%',
    backgroundColor: '#000',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
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
    color: '#fff',
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    width: '90%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Add this for Android shadow
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
  forecastImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  imageType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  imageNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  arrowButton: {
    padding: 10,
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
  weatherContainer: {
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  weatherIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  weatherInfo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  weatherDetails: {
    fontSize: 16,
    color: '#666',
  },
  adjustContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
  },
  adjustLabel: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    flex: 1,
  },
  dayTempContainer: {
    marginTop: 20,
  },
  dayTemp: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  mapContainer: {
    height: 360,
    width: '95%',
    marginBottom: 10,
    flex: 1,
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // or a contrasting color
    borderRadius: 25, // Makes it circular for a 50x50 container
    padding: 10,
  },  
});

export default Weather;