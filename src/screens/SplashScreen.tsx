import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  StatusBar,
  PanResponder,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // PanResponder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderGrant: () => {
        // Clear any existing timers when user starts interacting
        // This prevents auto-advance during manual swipe
      },
      onPanResponderMove: (evt, gestureState) => {
        // Visual feedback during swipe (optional)
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, vx } = gestureState;
        const threshold = 50;
        const velocityThreshold = 0.3;

        // Check both distance and velocity for better UX
        if ((dx > threshold || vx > velocityThreshold) && currentStep > 0) {
          // Swipe right - go to previous screen
          handlePrevious();
        } else if ((dx < -threshold || vx < -velocityThreshold) && currentStep < splashData.length - 1) {
          // Swipe left - go to next screen
          handleNext();
        }
      },
    })
  ).current;

  useEffect(() => {
    // Start initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Auto-navigation logic - 3 seconds per screen
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < splashData.length - 1) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setCurrentStep(currentStep + 1);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        });
      } else {
        // After completing all onboarding screens, navigate to Welcome
        setTimeout(() => {
          navigation.navigate('Welcome' as never);
        }, 1000);
      }
    }, 3000); // 3 seconds per screen

    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < splashData.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep + 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Navigate to Welcome when on last screen
      navigation.navigate('Welcome' as never);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep - 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
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
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Image 
            source={require('../assets/images/welcomescreen/logocaulitextonline.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Onboarding content with animation and swipe gesture */}
        <Animated.View 
          style={[
            styles.onboardingSection,
            {
              opacity: fadeAnim,
            }
          ]}
          {...panResponder.panHandlers}
        >
          <Image 
            source={splashData[currentStep].image} 
            style={styles.onboardingImage}
            resizeMode="contain"
          />
          <Text style={styles.onboardingTitle}>{splashData[currentStep].title}</Text>
          <Text style={styles.onboardingSubtitle}>{splashData[currentStep].subtitle}</Text>
          <Text style={styles.swipeHint}>← Vuốt để chuyển →</Text>
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
        <Text style={styles.footerText}>© 2025 Cauli App</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 180,
    height: 70,
  },
  onboardingSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    maxHeight: height * 0.6,
  },
  onboardingImage: {
    width: width * 0.6,
    height: height * 0.25,
    marginBottom: 20,
  },
  onboardingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A8C6B',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  onboardingSubtitle: {
    fontSize: 14,
    color: '#4A8C6B',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 15,
    opacity: 0.8,
  },
  swipeHint: {
    fontSize: 14,
    color: '#4A8C6B',
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.6,
    fontStyle: 'italic',
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 20,
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
});