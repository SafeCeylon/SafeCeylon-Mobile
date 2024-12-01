import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const DonationsScreen: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [otherItem, setOtherItem] = useState('');
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState(false);
  const [openOffices, setOpenOffices] = useState(false);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const supplyItems = [
    { label: 'Food', value: 'food' },
    { label: 'Water', value: 'water' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Medical Supplies', value: 'medical_supplies' },
    { label: 'Other', value: 'other' },
  ];

  const offices = [
    { label: 'DMC Office 1', value: 'office1' },
    { label: 'DMC Office 2', value: 'office2' },
  ];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleDonate = async () => {
    if (!termsAccepted) {
      Alert.alert('Terms and Conditions', 'You must agree to the terms and conditions.');
      return;
    }
    if (!selectedItem && !otherItem) {
      Alert.alert('Incomplete Details', 'Please select or specify an item to donate.');
      return;
    }
    if (!amount) {
      Alert.alert('Incomplete Details', 'Please enter the donation amount.');
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        'http://192.168.1.14:8080/api/users/add-sup-donation',
        {
          supplies: selectedItem === 'other' ? otherItem : selectedItem, // Map to 'supplies'
          quantity: amount, // Map to 'quantity'
          date: date.toISOString(), // Include date
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert('Success', 'Donation submitted successfully!');
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', 'Failed to process your donation.');
    }
  };  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.formHeader}>Select Items to Donate</Text>
      <DropDownPicker
        open={openItems}
        value={selectedItem}
        items={supplyItems}
        setOpen={setOpenItems}
        setValue={setSelectedItem}
        placeholder="Select an item"
        containerStyle={[styles.dropdownContainer, { zIndex: openItems ? 5000 : 1 }]}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: selectedItem === 'other' ? '#fff' : '#e0e0e0' },
        ]}
        placeholder="Other (if selected)"
        value={otherItem}
        onChangeText={setOtherItem}
        editable={selectedItem === 'other'}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter donation amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Text style={styles.formHeader}>Select Drop-off Location</Text>
      <DropDownPicker
        open={openOffices}
        value={selectedOffice}
        items={offices}
        setOpen={setOpenOffices}
        setValue={setSelectedOffice}
        placeholder="Select a location"
        containerStyle={[styles.dropdownContainer, { zIndex: openOffices ? 5000 : 1 }]}
      />
      <Text style={styles.formHeader}>Select Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
      )}
      <CheckBox
        title="Agree to Terms & Conditions"
        checked={termsAccepted}
        onPress={() => setTermsAccepted(!termsAccepted)}
      />
      <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
        <Text style={styles.donateButtonText}>DONATE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  formHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  donateButton: {
    backgroundColor: '#FF9900',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  donateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DonationsScreen;
