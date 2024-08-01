import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

import images from '@/constants/Images';
import icons from '@/constants/Icons';

const { width, height } = Dimensions.get('window');

const DisastersScreen: React.FC = () => {
  const router = useRouter();

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
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Landslides</Text>
            <Text style={styles.cardStatus}>
              On Going Status :{' '}
              <Text style={styles.statusAvailable}>available</Text>
            </Text>
            <View style={styles.cardFooter}>
              <TouchableOpacity
                onPress={() => router.push('/map')}
                style={styles.mapIconWrapper}
              >
                <Image source={icons.Map} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.victimButton}>
                <Text style={styles.victimButtonText}>I am a victim</Text>
                <Image source={icons.Victim} style={styles.victimIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Floods</Text>
            <Text style={styles.cardStatus}>
              On Going Status :{' '}
              <Text style={styles.statusAvailable}>available</Text>
            </Text>
            <View style={styles.cardFooter}>
              <TouchableOpacity
                onPress={() => router.push('/map')}
                style={styles.mapIconWrapper}
              >
                <Image source={icons.Map} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.victimButton}>
                <Text style={styles.victimButtonText}>I am a victim</Text>
                <Image source={icons.Victim} style={styles.victimIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Hurricanes</Text>
            <Text style={styles.cardStatus}>
              On Going Status :{' '}
              <Text style={styles.statusUnavailable}>unavailable</Text>
            </Text>
            <View style={styles.cardFooter}>
              <TouchableOpacity
                onPress={() => router.push('/map')}
                style={styles.mapIconWrapper}
              >
                <Image source={icons.Map} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.victimButton}>
                <Text style={styles.victimButtonText}>I am a victim</Text>
                <Image source={icons.Victim} style={styles.victimIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => router.push('/home/disasters/donations')}
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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  headerBackgroundImage: {
    width: '100%',
    height: height * 0.25,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: width * 0.6,
    height: height * 0.12,
    marginTop: height * 0.05,
    resizeMode: 'contain',
  },
  disasterImageContainer: {
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
  disasterImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
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
  disastersHeaderText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#FF9900',
    textAlign: 'center',
  },
  disastersHeaderSubText: {
    fontSize: width * 0.035,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 5,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  cardContainer: {
    width: '90%',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardStatus: {
    fontSize: width * 0.04,
    color: '#333',
    marginBottom: 10,
  },
  statusAvailable: {
    color: 'green',
  },
  statusUnavailable: {
    color: 'red',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  mapIconWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  victimButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  victimButtonText: {
    color: '#fff',
    fontSize: width * 0.035,
    marginRight: 5,
  },
  victimIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  donateButton: {
    backgroundColor: '#FF9900',
    borderRadius: 30,
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  donateIcon: {
    width: 50,
    height: 45,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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

export default DisastersScreen;
