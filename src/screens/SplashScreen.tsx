import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Debug: Add console.log to see what's happening
console.log('SplashScreen component loaded');

const { width, height } = Dimensions.get('window');

// Onboarding data
const splashData = [
  {
    title: "Cauli là người bạn sẵn sàng lắng nghe mỗi khi bạn cần",
    subtitle: "Niềm tin của bạn là vinh dự của Cauli",
    image: require('../assets/images/welcomescreen/wc1.png'),
    step: 1
  },
  {
    title: "Chia sẻ với Cauli, bạn hãy tự tin chia sẻ tâm sự của mình",
    subtitle: "Luôn sẵn lòng, không phán xét, không chỉ trích câu chuyện của bạn",
    image: require('../assets/images/welcomescreen/wc2.png'),
    step: 2
  },
  {
    title: "Chia sẻ sự cảm thông và giúp bạn bớt áp lực",
    subtitle: "Vừa cảm nhận được sự quan tâm, vừa học cách lắng nghe, cảm thông, chia sẻ",
    image: require('../assets/images/welcomescreen/wc3.png'),
    step: 3
  },
  {
    title: "Bạn đã sẵn sàng tâm sự và chia sẻ cùng Cauli chưa?",
    subtitle: "Chúc bạn có những trải nghiệm thật tốt với Cauli",
    image: require('../assets/images/welcomescreen/wc4.png'),
    step: 4
  }
];

export default function SplashScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Debug: Add console.log to see current step
  console.log('SplashScreen rendered, currentStep:', currentStep);

  useEffect(() => {
    // Start initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
    ]).start();
  }, []);

  // Auto-navigation logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < splashData.length - 1) {
        console.log('Auto advancing to step:', currentStep + 1);
        setCurrentStep(currentStep + 1);
      } else {
        // After completing all onboarding screens, do nothing
        // App.tsx will handle navigation
      }
    }, 10000); // 10 seconds per screen

    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < splashData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to Welcome when on last screen
      navigation.navigate('Welcome' as never);
    }
  };

  const handleSkip = () => {
    // Navigate to Welcome when skip is pressed
    navigation.navigate('Welcome' as never);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#CAEAC7" />
      
      {/* Background gradient effect */}
      <View style={styles.backgroundGradient} />
      
      {/* Main content */}
      <View style={styles.content}>
        {/* Logo section with animation */}
        <Animated.View 
          style={[
            styles.logoSection,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ]
            }
          ]}
        >
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/images/logo.png')} 
              style={styles.brandLogo}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

              {/* Onboarding content with animation */}
              <Animated.View
                style={[
                  styles.onboardingSection,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                  }
                ]}
              >
                <Text style={styles.debugText}>Debug: Step {currentStep + 1} of {splashData.length}</Text>
                <Text style={styles.debugText}>Image path: {JSON.stringify(splashData[currentStep].image)}</Text>
                
                {/* Test with simple text first */}
                <View style={styles.testImageContainer}>
                  <Text style={styles.testText}>TEST IMAGE AREA</Text>
                  <Image
                    source={splashData[currentStep].image}
                    style={styles.onboardingImage}
                    resizeMode="contain"
                    onError={(error) => console.log('Image load error:', error)}
                    onLoad={() => console.log('Image loaded successfully')}
                  />
                </View>
                
                <Text style={styles.onboardingTitle}>{splashData[currentStep].title}</Text>
                <Text style={styles.onboardingSubtitle}>{splashData[currentStep].subtitle}</Text>
              </Animated.View>

        {/* Progress dots */}
        <Animated.View 
          style={[
            styles.progressSection,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <View style={styles.progressDots}>
            {splashData.map((_, index) => (
              <View 
                key={index}
                style={[
                  styles.progressDot,
                  index === currentStep && styles.progressDotActive
                ]} 
              />
            ))}
          </View>
        </Animated.View>

        {/* Navigation buttons */}
        <Animated.View 
          style={[
            styles.navigationSection,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.skipButton} onPress={handleSkip}>
              Bỏ qua
            </Text>
            <Text style={styles.nextButton} onPress={handleNext}>
              {currentStep < splashData.length - 1 ? 'Tiếp theo' : 'Bắt đầu'}
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View 
        style={[
          styles.footer,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        <Text style={styles.footerText}>© 2024 Cauli App</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAEAC7',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#CAEAC7',
    opacity: 0.1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A8C6B',
    letterSpacing: 2,
  },
  brandLogo: {
    width: 140,
    height: 40,
  },
  onboardingSection: {
    alignItems: 'center',
    marginBottom: 40,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFF00', // Yellow background to see if section is visible
    borderWidth: 2,
    borderColor: '#0000FF',
  },
  onboardingImage: {
    width: width * 0.7,
    height: height * 0.3,
    marginBottom: 30,
    backgroundColor: '#FF0000', // Red background to see if image area is visible
    borderWidth: 2,
    borderColor: '#000000',
  },
  onboardingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A8C6B',
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  onboardingSubtitle: {
    fontSize: 14,
    color: '#4A8C6B',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 30,
    opacity: 0.8,
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  progressDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A8C6B',
    marginHorizontal: 5,
    opacity: 0.3,
  },
  progressDotActive: {
    opacity: 1,
    transform: [{ scale: 1.2 }],
  },
  navigationSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.8,
  },
  skipButton: {
    fontSize: 16,
    color: '#4A8C6B',
    opacity: 0.7,
    padding: 10,
  },
  nextButton: {
    fontSize: 16,
    color: '#4A8C6B',
    fontWeight: 'bold',
    padding: 12,
    backgroundColor: '#CAEAC7',
    borderRadius: 25,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: '#4A8C6B',
    minWidth: 120,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#4A8C6B',
    opacity: 0.6,
  },
  debugText: {
    fontSize: 12,
    color: '#FF0000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  testImageContainer: {
    width: width * 0.8,
    height: height * 0.4,
    backgroundColor: '#FFFF00', // Yellow background
    borderWidth: 2,
    borderColor: '#0000FF',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});