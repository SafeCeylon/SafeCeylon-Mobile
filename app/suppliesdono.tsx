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
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { CheckBox } from "react-native-elements";
import logo from "../assets/images/Logo3.png";
import backgroundImage from "../assets/images/defaultBGclipped.png";
import disasterImage from "../assets/images/disaster.png";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const DonationsScreen: React.FC = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [otherItem, setOtherItem] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

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
          <Image source={disasterImage} style={styles.disasterImage} />
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
          <Text style={styles.formHeader}>Select Items to Donate</Text>
          <DropDownPicker
            items={[
              { label: 'Food', value: 'food' },
              { label: 'Water', value: 'water' },
              { label: 'Clothing', value: 'clothing' },
              { label: 'Medical Supplies', value: 'medical_supplies' },
              { label: 'Blankets', value: 'blankets' },
              { label: 'Hygiene Products', value: 'hygiene_products' },
            ]}
            value={selectedItem}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownStyle={styles.dropdown}
            onChangeValue={setSelectedItem}
          />
          <TextInput
            style={styles.input}
            placeholder="Other"
            value={otherItem}
            onChangeText={setOtherItem}
          />
          <Text style={styles.formHeader}>Donation Drop-off Locations:</Text>
          <TextInput
            style={styles.input}
            placeholder="Number"
            value={number}
            onChangeText={setNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <CheckBox
            title="Agree to Terms & Conditions"
            checked={termsAccepted}
            onPress={() => setTermsAccepted(!termsAccepted)}
          />
          <TouchableOpacity style={styles.donateButton}>
            <Text style={styles.donateButtonText}>DONATE</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.contactText}>
          If you have any problem?{" "}
          <Text style={styles.contactLink}>Contact Us</Text>
        </Text>
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
            <Text style={styles.notificationText}>4</Text>
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
    height: 40,
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
  dropdown: {
    backgroundColor: "#fafafa",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
  },
  donateButton: {
    backgroundColor: "#FF9900",
    borderRadius: 20,
    padding: 10,
    width: "90%",
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
    fontSize: 16,
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
