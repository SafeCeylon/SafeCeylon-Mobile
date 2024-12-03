import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios"; // Axios for HTTP requests
import images from "@/constants/Images"; // Ensure to use correct image paths
import icons from "@/constants/Icons"; // Same here for icons
import AsyncStorage from "@react-native-async-storage/async-storage"; // For token storage

const { width, height } = Dimensions.get("window");

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]); // Initialize messages state
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://192.168.1.101:8080/api/messages", // Replace with your API endpoint for messages
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMessages(response.data); // Set messages fetched from the API
          setLoading(false); // Stop loading once data is fetched
        } else {
          Alert.alert("Error", "Token not found. Please log in again.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        Alert.alert("Error", "An error occurred while fetching messages.");
      }
    };

    fetchMessages();
  }, []);

  // Function to send a new message
  const sendMessage = async () => {
    if (inputText.trim()) {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const newMessage = {
            text: inputText,
            sender: "user",
          };

          // Send new message to the backend
          await axios.post(
            "http://192.168.1.101:8080/api/messages", // Replace with your API endpoint to send messages
            newMessage,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setMessages([...messages, newMessage]); // Update UI with new message
          setInputText(""); // Clear the input field
        } else {
          Alert.alert("Error", "Token not found. Please log in again.");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        Alert.alert("Error", "An error occurred while sending the message.");
      }
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.sender === "user" ? styles.userMessage : styles.botMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
            <Text style={styles.disastersHeaderText}>Support</Text>
            <Text style={styles.disastersHeaderSubText}>
              Feel free to ask me anything ...
            </Text>
          </View>
        </View>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        inverted
      />

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message ..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBackgroundImage: {
    width: "100%",
    height: height * 0.25,
    alignItems: "center",
  },
  headerContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
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
    fontSize: width * 0.08,
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
    paddingVertical: 10,
  },
  messageList: {
    paddingBottom: 60,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: "75%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#f5d6a9",
    borderTopRightRadius: 0,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E4E4E4",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#FF9900",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
