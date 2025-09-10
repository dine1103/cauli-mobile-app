import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Animated,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: "Cauli là người bạn sẵn sàng lắng nghe mỗi khi bạn cần",
    image: require('../assets/images/welcomescreen/wc1.png'),
  },
  {
    id: 2,
    title: "Chia sẻ với Cauli, bạn hãy tự tin chia sẻ tâm sự của mình",
    image: require('../assets/images/welcomescreen/wc2.png'),
  },
  {
    id: 3,
    title: "Chia sẻ sự cảm thông và giúp bạn bớt áp lực",
    image: require('../assets/images/welcomescreen/wc3.png'),
  },
  {
    id: 4,
    title: "Bạn đã sẵn sàng tâm sự và chia sẻ cùng Cauli chưa?",
    image: require('../assets/images/welcomescreen/wc4.png'),
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      // Chuyển đến LoginScreen
      navigation.navigate('Login' as never);
    }
  };

  const handleSkip = () => {
    // Chuyển đến LoginScreen
    navigation.navigate('Login' as never);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === currentIndex ? '#4A8C6B' : '#E5E7EB' },
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#CAEAC7', '#A8D8A8']}
        style={styles.gradient}
      >
        {/* Header with Skip button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>

        {/* Onboarding slides */}
        <View style={styles.slidesContainer}>
          <FlatList
            ref={flatListRef}
            data={onboardingData}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentIndex(index);
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          />
        </View>

        {/* Dots indicator */}
        {renderDots()}

        {/* Navigation buttons */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={handlePrevious}
            style={[
              styles.navButton,
              styles.previousButton,
              { opacity: currentIndex === 0 ? 0.3 : 1 },
            ]}
            disabled={currentIndex === 0}
          >
            <Text style={styles.navButtonText}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            style={[styles.navButton, styles.nextButton]}
          >
            <Text style={styles.navButtonText}>
              {currentIndex === onboardingData.length - 1 ? 'Bắt đầu' : '→'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  slidesContainer: {
    flex: 1,
    marginTop: 40,
  },
  slide: {
    width: width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
  },
  textContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 32,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  navButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  previousButton: {
    // Previous button styles
  },
  nextButton: {
    backgroundColor: '#4A8C6B',
    borderColor: '#4A8C6B',
  },
  navButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
