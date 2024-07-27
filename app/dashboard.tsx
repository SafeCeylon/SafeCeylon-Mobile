import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import logo from '../assets/images/Logo3.png';
import backgroundImage from '../assets/images/defaultBGclipped.png';
import weatherImage from '../assets/images/weather.png';
import disasterImage from '../assets/images/disaster.png';
import predictionsImage from '../assets/images/predictions.png';
import { useRouter } from 'expo-router';

const HomeScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.headerBackgroundImage}>
        <View style={styles.headerContent}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>
      </ImageBackground>

      <View style={styles.weatherContainer}>
        <View style={styles.weatherBackground}>
          <Text style={styles.headerText}>Tuesday 1:00 pm | Mostly Cloudy</Text>
          <Text style={styles.headerSubText}>
            ll Temperature: 30 °C || Precipitation: 64% || Humidity: 78% || Wind: 21 km/h ll
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/weatherForecasts')}>
          <Image source={weatherImage} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Weather Forecasts</Text>
            <Text style={styles.cardDescription}>
              View public weather, Marine weather, City forecasts, 9 day weather forecast, Weekly weather.
            </Text>
          </View>
          <View style={styles.arrowContainer}>
            <FontAwesome5 name="chevron-right" size={24} color="#000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/disasters')}>
          <Image source={disasterImage} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Disasters</Text>
            <Text style={styles.cardDescription}>
              Manage user reports, View DMC reports, View hospitals, shelters locations and Avoid disasters.
            </Text>
          </View>
          <View style={styles.arrowContainer}>
            <FontAwesome5 name="chevron-right" size={24} color="#000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/disasterPredictions')}>
          <Image source={predictionsImage} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Disaster Predictions</Text>
            <Text style={styles.cardDescription}>
              View disaster prediction locations, mainly Floods, Landslides, Hurricanes.
            </Text>
          </View>
          <View style={styles.arrowContainer}>
            <FontAwesome5 name="chevron-right" size={24} color="#000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sosButton}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/dashboard')}>
          <FontAwesome5 name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/map')}>
          <FontAwesome5 name="map" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/comments')}>
          <FontAwesome5 name="comments" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/notifications')}>
          <FontAwesome5 name="bell" size={24} color="#000" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>4</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <FontAwesome5 name="user" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackgroundImage: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
  },
  weatherContainer: {
    width: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  weatherBackground: {
    backgroundColor: '#0E7C75',
    borderRadius: 0,
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
  headerSubText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    width: '90%',
    padding: 0, // Adjust padding to fit the image background
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute', // Make the image cover the card
    top: 0,
    left: 0,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    zIndex: 1, // Ensure content is above the image
    marginRight: 60, // Adjust margin to prevent overlap with arrow
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFD700',
  },
  cardDescription: {
    fontSize: 14,
    color: '#fff', // Changed text color to white
  },
  arrowContainer: {
    backgroundColor: '#fff',
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    right: 0,
  },
  sosButton: {
    backgroundColor: '#FF9900',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  sosText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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

export default HomeScreen;
