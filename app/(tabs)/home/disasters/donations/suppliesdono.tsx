import React, { useState } from "react";
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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";
import { useRouter } from "expo-router";
import images from "@/constants/Images";
import icons from "@/constants/Icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const DonationsScreen: React.FC = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [otherItem, setOtherItem] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState(false);
  const [openOffices, setOpenOffices] = useState(false);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const supplyItems = [
    { label: "Food", value: "food" },
    { label: "Water", value: "water" },
    { label: "Clothing", value: "clothing" },
    { label: "Medical Supplies", value: "medical_supplies" },
    { label: "Other", value: "other" },
  ];
  const offices = [
    { label: "DMC Office 1", value: "office1" },
    { label: "DMC Office 2", value: "office2" },
  ];
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };
  const handleDonate = async () => {
    if (!termsAccepted) {
      Alert.alert(
        "Terms and Conditions",
        "You must agree to the terms and conditions."
      );
      return;
    }
    if (!selectedItem && !otherItem) {
      Alert.alert(
        "Incomplete Details",
        "Please select or specify an item to donate."
      );
      return;
    }
    if (!amount) {
      Alert.alert("Incomplete Details", "Please enter the donation amount.");
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        "http://192.168.1.44:8080/api/users/add-sup-donation",
        {
          supplies: selectedItem === "other" ? otherItem : selectedItem, // Map to 'supplies'
          quantity: amount, // Map to 'quantity'
          date: date.toISOString(), // Include date
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert("Success", "Donation submitted successfully!");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", "Failed to process your donation.");
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
            <Text style={styles.disastersHeaderText}>Supplies Donations</Text>
            <Text style={styles.disastersHeaderSubText}>
              Donating supplies is a tangible way to make a difference and
              provide necessary aid to those affected by disasters.
            </Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          {/* Select Items to Donate */}
          <Text style={styles.formHeader}>Select Items to Donate</Text>
          <DropDownPicker
            open={openItems}
            value={selectedItem}
            items={supplyItems}
            setOpen={setOpenItems}
            setValue={setSelectedItem}
            placeholder="Select an Item"
            placeholderStyle={styles.dropdownPlaceholder}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            style={styles.dropdownStyle}
            containerStyle={[
              styles.dropdownContainer,
              { zIndex: openItems ? 5000 : 1 },
            ]}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: selectedItem === "other" ? "#fff" : "#e0e0e0",
              },
            ]}
            placeholder="Other (If Selected)"
            value={otherItem}
            onChangeText={setOtherItem}
            editable={selectedItem === "other"}
          />

          {/* Donation Amount */}
          <TextInput
            style={styles.input}
            placeholder="Enter Donation Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          {/* Select Drop-off Location */}
          <Text style={styles.formHeader}>Select Drop-off Location</Text>
          <DropDownPicker
            open={openOffices}
            value={selectedOffice}
            items={offices}
            setOpen={setOpenOffices}
            setValue={setSelectedOffice}
            placeholder="Select a Location"
            placeholderStyle={styles.dropdownPlaceholder}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            style={styles.dropdownStyle}
            containerStyle={[
              styles.dropdownContainer,
              { zIndex: openOffices ? 5000 : 1 },
            ]}
          />

          {/* Select Date */}
          <Text style={styles.formHeader}>Select Date</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={[styles.input, styles.datePicker]}
          >
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          {/* Terms and Conditions */}
          <CheckBox
            title="Agree to Terms & Conditions"
            checked={termsAccepted}
            onPress={() => setTermsAccepted(!termsAccepted)}
          />

          {/* Donate Button */}
          <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
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
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  headerBackgroundImage: {
    width: "100%",
    height: height * 0.25,
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
  disasterImageContainer: {
    marginLeft: "5%",
    width: "90%",
    alignItems: "center",
    marginTop: -80,
    paddingTop: 20,
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
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#FF9900",
    textAlign: "center",
  },
  disastersHeaderSubText: {
    fontSize: width * 0.035,
    color: "#FFF",
    textAlign: "center",
    marginTop: 5,
  },
  scrollViewContent: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  formContainer: {
    width: "90%",
    alignItems: "center",
  },
  formHeader: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  dropdownContainer: {
    width: "90%",
    marginVertical: 10,
  },
  dropdownStyle: {
    backgroundColor: "#fff", // Dropdown button background
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  dropDownContainerStyle: {
    backgroundColor: "#fafafa", // Dropdown list background
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
  },
  dropdownPlaceholder: {
    color: "#999", // Placeholder text color
    fontSize: 16,
  },

  datePicker: {
    justifyContent: "center", // Vertically center content
    alignItems: "center", // Horizontally center content
  },
  dateText: {
    fontSize: 18,
    color: "#333", // Adjust color if needed
  },

  donateButton: {
    backgroundColor: "#FF9900",
    borderRadius: 20,
    padding: 10,
    width: "90%",
    height: 50,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  donateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  contactText: {
    fontSize: width * 0.035,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  contactLink: {
    color: "#FF9900",
    textDecorationLine: "underline",
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

export default DonationsScreen;
