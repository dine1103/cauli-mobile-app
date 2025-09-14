import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

// Dữ liệu 4 screens onboarding
const onboardingData = [
  {
    id: 1,
    title: "Cauli là người bạn sẵn sàng lắng nghe mỗi khi bạn cần",
    subtitle: "Niềm tin của bạn là vinh dự của Cauli",
    image: require('../assets/images/welcomescreen/wc1.png'),
  },
  {
    id: 2,
    title: "Chia sẻ với Cauli, bạn hãy tự tin chia sẻ tâm sự của mình",
    subtitle: "Luôn sẵn lòng, không phán xét, không chỉ trích câu chuyện của bạn",
    image: require('../assets/images/welcomescreen/wc2.png'),
  },
  {
    id: 3,
    title: "Chia sẻ sự cảm thông và giúp bạn bớt áp lực",
    subtitle: "Vừa cảm nhận được sự quan tâm, vừa học cách lắng nghe, cảm thông, chia sẻ",
    image: require('../assets/images/welcomescreen/wc3.png'),
  },
  {
    id: 4,
    title: "Bạn đã sẵn sàng tâm sự và chia sẻ cùng Cauli chưa?",
    subtitle: "Chúc bạn có những trải nghiệm thật tốt với Cauli",
    image: require('../assets/images/welcomescreen/wc4.png'),
  }
];

interface OnboardingScreenProps {
  onComplete?: () => void;
  onBack?: () => void;
}

export default function OnboardingScreen({ onComplete, onBack }: OnboardingScreenProps) {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Xử lý vuốt trái/phải
  const handleSwipe = (event: any) => {
    const { translationX, state } = event.nativeEvent;
    
    if (state === State.END) {
      const threshold = 50; // Ngưỡng vuốt tối thiểu
      
      if (translationX > threshold && currentIndex > 0) {
        // Vuốt phải - quay lại screen trước
        setCurrentIndex(currentIndex - 1);
      } else if (translationX < -threshold && currentIndex < onboardingData.length - 1) {
        // Vuốt trái - chuyển đến screen tiếp theo
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    // Chuyển đến WelcomeScreen hoặc quay lại
    if (onBack) {
      onBack(); // Quay lại WelcomeScreen
    } else if (onComplete) {
      onComplete(); // Chuyển đến WelcomeScreen (từ splash)
    } else {
      // Fallback: không navigate, chỉ log
      console.log('Skip - no callback provided');
    }
  };

  const handleStart = () => {
    // Khi bấm "Bắt đầu" ở screen cuối
    if (onBack) {
      onBack(); // Quay lại WelcomeScreen
    } else if (onComplete) {
      onComplete(); // Chuyển đến WelcomeScreen (từ splash)
    } else {
      // Fallback: không navigate, chỉ log
      console.log('Start - no callback provided');
    }
  };

  const currentData = onboardingData[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#CAEAC7" />
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.brandLogo}
          resizeMode="contain"
        />
      </View>

      {/* Main Content */}
      <PanGestureHandler onHandlerStateChange={handleSwipe}>
        <View style={styles.contentContainer}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image
              source={currentData.image}
              style={styles.image}
              resizeMode="contain"
              onError={(error) => console.log('Image error:', error)}
              onLoad={() => console.log('Image loaded')}
            />
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{currentData.title}</Text>
            <Text style={styles.subtitle}>{currentData.subtitle}</Text>
            <Text style={styles.swipeHint}>← Vuốt để chuyển →</Text>
          </View>
        </View>
      </PanGestureHandler>

      {/* Progress Dots */}
      <View style={styles.progressContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentIndex && styles.progressDotActive
            ]}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Bỏ qua</Text>
        </TouchableOpacity>

        <View style={styles.navButtons}>
          {currentIndex > 0 && (
            <TouchableOpacity style={styles.prevButton} onPress={handlePrevious}>
              <Text style={styles.prevButtonText}>Trước</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={currentIndex === onboardingData.length - 1 ? handleStart : handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === onboardingData.length - 1 ? 'Bắt đầu' : 'Tiếp theo'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAEAC7',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A8C6B',
  },
  brandLogo: {
    width: 120,
    height: 40,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A8C6B',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#4A8C6B',
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
  swipeHint: {
    fontSize: 12,
    color: '#4A8C6B',
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.6,
    fontStyle: 'italic',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
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
});