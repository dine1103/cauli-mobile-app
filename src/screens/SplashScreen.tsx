import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  StatusBar,
  TouchableOpacity,
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
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
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

  const handleSkip = () => {
    // Navigate to Welcome when skip is pressed
    navigation.navigate('Welcome' as never);
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
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ]
            }
          ]}
        >
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/images/logowithouttext.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.appName}>cauli</Text>
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
          <Image 
            source={splashData[currentStep].image} 
            style={styles.onboardingImage}
            resizeMode="contain"
          />
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
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Bỏ qua</Text>
            </TouchableOpacity>
            
            <View style={styles.navButtons}>
              {currentStep > 0 && (
                <TouchableOpacity style={styles.prevButton} onPress={handlePrevious}>
                  <Text style={styles.prevButtonText}>Trước</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>
                  {currentStep < splashData.length - 1 ? 'Tiếp theo' : 'Bắt đầu'}
                </Text>
              </TouchableOpacity>
            </View>
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
  onboardingSection: {
    alignItems: 'center',
    marginBottom: 40,
    flex: 1,
    justifyContent: 'center',
  },
  onboardingImage: {
    width: width * 0.7,
    height: height * 0.3,
    marginBottom: 30,
  },
  onboardingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A8C6B',
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  onboardingSubtitle: {
    fontSize: 16,
    color: '#4A8C6B',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
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
    width: width * 0.9,
  },
  skipButton: {
    padding: 10,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#4A8C6B',
    opacity: 0.7,
  },
  navButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prevButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#4A8C6B',
  },
  prevButtonText: {
    fontSize: 16,
    color: '#4A8C6B',
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#4A8C6B',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
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