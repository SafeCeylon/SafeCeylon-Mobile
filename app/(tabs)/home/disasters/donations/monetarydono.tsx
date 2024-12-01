import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '@/constants/Images';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const DonationsScreen: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [otherAmount, setOtherAmount] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAmountPress = (amount: string) => {
    setSelectedAmount(amount);
    setOtherAmount('');
  };

  const handleOtherAmountChange = (amount: string) => {
    setOtherAmount(amount);
    setSelectedAmount('');
  };

  const handleDonatePress = async () => {
    if (!termsAccepted) {
      Alert.alert('Terms and Conditions', 'You must agree to the terms and conditions.');
      return;
    }

    const amount = otherAmount || selectedAmount;
    if (!amount || !firstName || !lastName || !cardNumber || !expireDate || !cvc) {
      Alert.alert('Incomplete Details', 'Please fill all required fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        'http://192.168.1.14:8080/api/users/add-mono-donation',
        {
          amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert('Success', 'Donation successful!');
      router.push('/home');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to process your donation.');
    }
  };

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
            <Text style={styles.disastersHeaderText}>Monetary Donations</Text>
            <Text style={styles.disastersHeaderSubText}>
              Your donation can make a significant impact in helping those affected by disasters to recover and rebuild their lives.
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>Select a Donation Amount [LKR]</Text>
          <View style={styles.amountContainer}>
            <TouchableOpacity
              style={[
                styles.amountButton,
                selectedAmount === '5000' && styles.selectedAmountButton,
              ]}
              onPress={() => handleAmountPress('5000')}
            >
              <Text style={styles.amountButtonText}>LKR 5000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.amountButton,
                selectedAmount === '10000' && styles.selectedAmountButton,
              ]}
              onPress={() => handleAmountPress('10000')}
            >
              <Text style={styles.amountButtonText}>LKR 10000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.amountButton,
                selectedAmount === '15000' && styles.selectedAmountButton,
              ]}
              onPress={() => handleAmountPress('15000')}
            >
              <Text style={styles.amountButtonText}>LKR 15000</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Other"
            keyboardType="numeric"
            value={otherAmount}
            onChangeText={handleOtherAmountChange}
          />
          <Text style={styles.formHeader}>Payment Details</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Expire Date"
            value={expireDate}
            onChangeText={setExpireDate}
          />
          <TextInput
            style={styles.input}
            placeholder="CVC"
            keyboardType="numeric"
            value={cvc}
            onChangeText={setCvc}
          />
          <CheckBox
            title="Agree to Terms & Conditions"
            checked={termsAccepted}
            onPress={() => setTermsAccepted(!termsAccepted)}
          />
          <TouchableOpacity style={styles.donateButton} onPress={handleDonatePress}>
            <Text style={styles.donateButtonText}>DONATE</Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  formContainer: {
    width: '90%',
    alignItems: 'center',
  },
  formHeader: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  amountButton: {
    backgroundColor: '#FF9900',
    borderRadius: 20,
    padding: 10,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedAmountButton: {
    backgroundColor: '#FF6600',
  },
  amountButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  donateButton: {
    backgroundColor: '#FF9900',
    borderRadius: 20,
    padding: 10,
    width: '90%',
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  donateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactText: {
    fontSize: width * 0.035,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  contactLink: {
    color: '#FF9900',
    textDecorationLine: 'underline',
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

export default DonationsScreen;
