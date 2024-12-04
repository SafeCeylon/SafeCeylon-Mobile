import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Notification = {
  id: string;
  title: string;
  message: string;
  date: string;
  threatLevel: string;
  idUser?: string;
  status?: string;
  cleared?: boolean;
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        'http://192.168.1.44:8080/api/users/get-notifications',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const clearNotification = async (notificationId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        `http://192.168.1.44:8080/api/users/clear-notification`,
        { notificationId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert('Success', 'Notification cleared!');
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error('Error clearing notification:', error);
      Alert.alert('Error', 'Failed to clear notification.');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const getSeverityColor = (severity: String) => {
    switch (severity) {
      case 'Red':
        return '#FF0000';
      case 'Amber':
        return '#FFBF00';
      case 'Yellow':
        return '#FFFF00';
      case 'Grey':
        return '#CCCCCC';
      default:
        return '#CCCCCC';
    }
  };

  return (
    <LinearGradient
      colors={['#007B70', '#00E1CD']}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.gradientBackground}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <View style={styles.notificationContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {notifications.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <View
                style={[
                  styles.severityBar,
                  { backgroundColor: getSeverityColor(notification.threatLevel) },
                ]}
              />
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationDescription}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationDate}>
                  {new Date(notification.date).toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => clearNotification(notification.id)}
              >
                <FontAwesome5 name="times" size={20} color="#FF0000" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 10,
  },
  notificationContainer: {
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityBar: {
    width: 50,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  notificationContent: {
    flex: 1,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007B70',
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 10,
  },
  clearButton: {
    padding: 10,
  },
});

export default NotificationPage;