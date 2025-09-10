import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    // Check if running on web
    const isWeb = typeof window !== 'undefined';
    
    if (isWeb) {
      // Web version - use confirm dialog
      const confirmed = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
      if (confirmed) {
        try {
          await supabase.auth.signOut();
          console.log('Logged out successfully');
          // Redirect to welcome screen or reload page
          window.location.reload();
        } catch (error) {
          console.error('Error signing out:', error);
        }
      }
    } else {
      // Mobile version - use Alert
      Alert.alert(
        'Đăng xuất',
        'Bạn có chắc chắn muốn đăng xuất?',
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Đăng xuất',
            style: 'destructive',
            onPress: async () => {
              try {
                await supabase.auth.signOut();
                console.log('Logged out successfully');
              } catch (error) {
                console.error('Error signing out:', error);
              }
            },
          },
        ]
      );
    }
  };

  const quickActions = [
    {
      title: 'Chat với Cauli',
      subtitle: 'Chia sẻ cảm xúc của bạn',
      icon: '💬',
      color: '#4A8C6B',
      onPress: () => navigation.navigate('Chat' as never),
    },
    {
      title: 'Viết nhật ký',
      subtitle: 'Ghi lại những suy nghĩ',
      icon: '📝',
      color: '#6BA87A',
      onPress: () => navigation.navigate('Diary' as never),
    },
    {
      title: 'Thiền định',
      subtitle: 'Thư giãn và tĩnh tâm',
      icon: '🧘',
      color: '#8BC34A',
      onPress: () => {},
    },
    {
      title: 'Bài tập thở',
      subtitle: 'Giảm căng thẳng',
      icon: '🌬️',
      color: '#9CCC65',
      onPress: () => {},
    },
  ];

  const moodOptions = [
    { emoji: '😊', label: 'Vui vẻ' },
    { emoji: '😌', label: 'Bình yên' },
    { emoji: '😔', label: 'Buồn' },
    { emoji: '😰', label: 'Lo lắng' },
    { emoji: '😤', label: 'Tức giận' },
    { emoji: '😴', label: 'Mệt mỏi' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#CAEAC7', '#A8D8A8']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>Xin chào!</Text>
            <Text style={styles.userName}>Bạn có khỏe không?</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile' as never)}
            >
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hôm nay bạn cảm thấy thế nào?</Text>
          <View style={styles.moodContainer}>
            {moodOptions.map((mood, index) => (
              <TouchableOpacity key={index} style={styles.moodItem}>
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hoạt động nhanh</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { backgroundColor: action.color }]}
                onPress={action.onPress}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lời khuyên hôm nay</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>💡</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Hít thở sâu</Text>
              <Text style={styles.tipText}>
                Dành 5 phút mỗi ngày để hít thở sâu và thư giãn. 
                Điều này sẽ giúp bạn giảm căng thẳng và cải thiện tâm trạng.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  greeting: {
    flex: 1,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  profileIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: (width - 60) / 3,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tipCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  tipIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
