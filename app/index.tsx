import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Replace with your actual logo
import logo from '../assets/images/Logo2.png';
import backgroundImage from '../assets/images/HomeBG.png';

const LandingPage = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/dashboard');
  };

  const handleSignUp = () => {
    router.push('/signUp');
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <LinearGradient
            colors={['#007B70', '#00E1CD']}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradient}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.dontHaveText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.99)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 100,
  },
  signInButton: {
    width: '70%',
    marginBottom: 15,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 18,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: '#00E1CD',
    fontSize: 16,
  },
  dontHaveText: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
});

export default LandingPage;
