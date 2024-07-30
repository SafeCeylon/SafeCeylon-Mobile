import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import MapView from "react-native-maps"; // Ensure react-native-maps is installed
import { useRouter } from "expo-router";

const MapPage: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedReports, setSelectedReports] = useState<{
    [key: string]: boolean;
  }>({
    Flood: false,
    Hurricane: false,
    Landslide: false,
  });
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const performSearch = () => {
    if (searchText.trim() === "") {
      Alert.alert("Search Error", "Please enter a search term.");
      return;
    }
    // Implement search functionality here
    // For example, you might want to filter map markers or perform an API call
    Alert.alert("Search", `Searching for: ${searchText}`);
    // You might also update the map or other components based on the search result
  };

  const toggleReportDropdown = () => setShowReportDropdown(!showReportDropdown);

  const handleReportToggle = (report: string) => {
    setSelectedReports((prevState) => ({
      ...prevState,
      [report]: !prevState[report],
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 7.8731,
          longitude: 80.7718,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {/* Add Markers or other Map components here */}
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search locations..."
          value={searchText}
          onChangeText={handleSearchChange}
        />
        <TouchableOpacity style={styles.searchButton} onPress={performSearch}>
          <FontAwesome5 name="search" size={18} color="#007B70" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <View style={styles.checkboxContainer}>
          <View style={styles.leftCheckboxes}>
            <TouchableOpacity style={styles.checkbox}>
              <Text style={styles.checkboxLabel}>Hospitals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkbox}>
              <Text style={styles.checkboxLabel}>Shelters</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={toggleReportDropdown}
            style={styles.reportCheckbox}
          >
            <Text style={styles.checkboxLabel}>Reports</Text>
            <FontAwesome5
              name={showReportDropdown ? "chevron-up" : "chevron-down"}
              size={18}
              color="#007B70"
            />
          </TouchableOpacity>
        </View>
        {showReportDropdown && (
          <View style={styles.dropdownList}>
            {Object.keys(selectedReports).map((report) => (
              <TouchableOpacity
                key={report}
                onPress={() => handleReportToggle(report)}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownItemText}>{report}</Text>
                <FontAwesome5
                  name={selectedReports[report] ? "check-square" : "square"}
                  size={20}
                  color="#007B70"
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.disasterButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.disasterButtonText}>Add Disaster</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Disaster Report</Text>
            {/* Add disaster report form or content here */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/dashboard")}
        >
          <FontAwesome5 name="home" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/map")}
        >
          <FontAwesome5 name="map" size={24} color="#000" />
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
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",
    top: 50, // Adjusted to move the search bar 40px lower
    left: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#007B70",
    borderWidth: 1,
    borderRadius: 5, // Rounded edges
    padding: 10,
    paddingRight: 40, // Make space for the search icon
  },
  searchButton: {
    position: "absolute",
    right: 20, // Position icon inside the search bar
    top: "50%",
    transform: [{ translateY: -9 }], // Center vertically
    justifyContent: "center",
    alignItems: "center",
  },
  filtersContainer: {
    position: "absolute",
    top: 110, // Adjusted to move the filters down
    left: 10,
    right: 10,
    zIndex: 2,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftCheckboxes: {
    flexDirection: "row",
  },
  reportCheckbox: {
    backgroundColor: "#fff", // Added background color to "Reports"
    borderColor: "#007B70",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    backgroundColor: "#fff",
    borderColor: "#007B70",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#007B70",
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderColor: "#007B70",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#007B70",
  },
  disasterButton: {
    position: "absolute",
    bottom: 60, // Adjusted to make space for the bottom navigation bar
    right: 20,
    backgroundColor: "#007B70",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  disasterButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#007B70",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
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
    zIndex: 1,
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

export default MapPage;
