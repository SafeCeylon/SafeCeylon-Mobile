import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import logo from "../assets/images/Logo3.png";
import backgroundImage from "../assets/images/defaultBGclipped.png";
import disasterImage from "../assets/images/disaster.png";
import dollarIcon from "../assets/images/icons/Receive Dollar.png";
import suppliesIcon from "../assets/images/icons/Receive Cash.png";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const DonationsScreen: React.FC = () => {
  const router = useRouter();

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
            <Text style={styles.disastersHeaderText}>Donations</Text>
            <Text style={styles.disastersHeaderSubText}>
              Choose the type of donations that aligns with your availability to
              make the most impact.
            </Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[styles.card, styles.monetaryCard]}
            onPress={() => router.push("/monetarydono")}
          >
            <Image source={dollarIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Monetary Donations</Text>
              <Text style={styles.cardDescription}>
                Your donation can make a significant impact in helping those
                affected by disasters to recover and rebuild their lives.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.suppliesCard]}
            onPress={() => router.push("/suppliesdono")}
          >
            <Image source={suppliesIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Supplies Donations</Text>
              <Text style={styles.cardDescription}>
                Donating supplies is a tangible way to make a difference and
                provide necessary aid to those affected by disasters.
              </Text>
            </View>
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
  headerText: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#FF9900",
    textAlign: "center",
    marginVertical: 10,
  },
  subHeaderText: {
    fontSize: width * 0.045,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  cardContainer: {
    width: "90%",
    alignItems: "center",
  },
  card: {
    width: "100%",
    borderRadius: 30,
    padding: 15,
    paddingTop: 50,
    paddingBottom: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  monetaryCard: {
    backgroundColor: "#FFCE85",
  },
  suppliesCard: {
    backgroundColor: "#72CBBF",
  },
  icon: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#000",
  },
  cardDescription: {
    fontSize: width * 0.03,
    color: "#000",
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
