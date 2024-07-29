import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const NotificationPage = () => {
  const router = useRouter();

  const notifications = [
    {
      title: 'Severe Weather Alert',
      description: 'A severe weather warning has been issued for your area. Please take necessary precautions.',
      date: 'July 27, 2024',
      severity: 'red',
    },
    {
      title: 'High Wind Warning',
      description: 'Strong winds expected. Secure loose objects and avoid unnecessary travel.',
      date: 'July 26, 2024',
      severity: 'amber',
    },
    {
      title: 'Flood Watch',
      description: 'Heavy rains may cause flooding. Be prepared and stay informed.',
      date: 'July 25, 2024',
      severity: 'yellow',
    },
    {
      title: 'Scheduled Maintenance',
      description: 'Maintenance is scheduled for tonight. Service may be intermittent.',
      date: 'July 23, 2024',
      severity: 'grey',
    },
    {
      title: 'Service Update',
      description: 'Updates have been made to the system. Please review the changes.',
      date: 'July 22, 2024',
      severity: 'grey',
    },
    // Add more notifications here
  ];

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
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notificationCard}>
              <View style={[styles.severityBar, { backgroundColor: getSeverityColor(notification.severity) }]} />
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationDescription}>{notification.description}</Text>
                <Text style={styles.notificationDate}>{notification.date}</Text>
              </View>
              <TouchableOpacity
                style={styles.arrowContainer}
                onPress={() => alert('Arrow pressed')}
              >
                <FontAwesome5 name="chevron-right" size={20} color="#007B70" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/dashboard')}>
          <FontAwesome5 name="home" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/map')}>
          <FontAwesome5 name="map" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/comments')}>
          <FontAwesome5 name="comments" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/notifications')}>
          <FontAwesome5 name="bell" size={24} color="#000" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>6</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <FontAwesome5 name="user" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'red':
      return '#FF0000'; // Red for severe threat
    case 'amber':
      return '#FFBF00'; // Amber for moderate threat
    case 'yellow':
      return '#FFFF00'; // Yellow for low threat
    case 'grey':
      return '#CCCCCC'; // Grey for non-weather alerts
    default:
      return '#CCCCCC'; // Default color
  }
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: Adds slight background to header text
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
    paddingBottom: 50, // Ensure bottom nav does not overlap with content
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
    position: 'relative', // Ensure position is relative for absolute children
  },
  severityBar: {
    width: 50,
    height: '100%', // Span the full height of the card
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute', // Position it absolutely
    left: 0, // Stick to the left
    top: 0, // Stick to the top
  },
  notificationContent: {
    flex: 1,
    marginLeft: 70, // Ensure content does not overlap with severity bar
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
  arrowContainer: {
    padding: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
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

export default NotificationPage;
