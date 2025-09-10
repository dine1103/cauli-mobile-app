import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header with logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/images/logowithouttext.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.appName}>cauli</Text>
          </View>
        </View>

        {/* Main content */}
        <View style={styles.mainContent}>
          <Image 
            source={require('../assets/images/logowithouttext.png')} 
            style={styles.mainImage}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Hãy để Cauli lắng nghe và chia sẻ cùng bạn</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login' as never)}
          >
            <Text style={styles.primaryButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Register' as never)}
          >
            <Text style={styles.secondaryButtonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAEAC7',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A8C6B',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainImage: {
    width: width * 0.6,
    height: height * 0.3,
    marginBottom: 30,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A8C6B',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#4A8C6B',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A8C6B',
  },
  secondaryButtonText: {
    color: '#4A8C6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
