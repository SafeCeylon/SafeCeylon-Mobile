import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import mail from "../assets/images/mail.png";

const VerificationMailPage = () => {
  const router = useRouter();

  const handleOpenEmailApp = () => {
    // Try to open the email app
    Linking.openURL("mailto:");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <View style={styles.iconPlaceholder}>
              <Image source={mail} style={styles.icon} />
            </View>
          </View>
          <Text style={styles.title}>Check your Mail</Text>
          <Text style={styles.instructionText}>
            We have sent a password recover instructions to your email.
          </Text>
          <TouchableOpacity
            style={styles.emailButton}
            onPress={handleOpenEmailApp}
          >
            <LinearGradient
              colors={["#007B70", "#00E1CD"]}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Open email app</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert("Skip", "Skip, I’ll confirm later")}
            onPressIn={() => router.push("/resetPw")}
          >
            <Text style={styles.skipText}>Skip, I’ll confirm later</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Did not receive the email? Check your spam filter or
          <Text
            style={styles.linkText}
            onPress={() => router.push("/forgotPw")}
          >
            {" "}
            try another email address
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  emailButton: {
    width: "100%",
    marginBottom: 15,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  skipText: {
    fontSize: 16,
    color: "#00E1CD",
    marginTop: 15,
    textAlign: "center",
  },
  footer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#00E1CD",
  },
});

export default VerificationMailPage;
