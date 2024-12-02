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
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import images from "@/constants/Images";
import icons from "@/constants/Icons";

const { width, height } = Dimensions.get("window");

const DonationsScreen: React.FC = () => {
  const router = useRouter();
  const handleContactPress = async () => {
    const email = "dev.safeceylon@gmail.com";
    const subject = "Support Request"; // Optional: Set a default subject
    const body = ""; // Optional: Set a default body content
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  
    const canOpen = await Linking.canOpenURL(mailto);
    if (canOpen) {
      Linking.openURL(mailto).catch((err) => {
        console.error("Failed to open email app:", err);
      });
    } else {
      Alert.alert(
        "No Email App Found",
        "Please install and set up an email app to send an email."
      );
    }
  };
  

  const handleContactPress = () => {
    const email = 'dev.safeceylon@gmail.com';
    const subject = 'Support Request'; // Optional: Set a default subject
    const body = ''; // Optional: Set a default body content
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch(err => {
      console.error('Failed to open email app:', err);
    });
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
            onPress={() =>
              router.push("/home/disasters/donations/monetarydono")
            }
          >
            <Image source={icons.ReceiveDollar} style={styles.icon} />
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
            onPress={() =>
              router.push("/home/disasters/donations/suppliesdono")
            }
          >
            <Image source={icons.ReceiveCash} style={styles.icon} />
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
          <TouchableOpacity onPress={handleContactPress}>
            <Text style={styles.contactLink}>Contact Us</Text>
          </TouchableOpacity>
        </Text>
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
    marginTop: 0,
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
