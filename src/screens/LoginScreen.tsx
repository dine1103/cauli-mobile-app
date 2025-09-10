import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Lỗi đăng nhập', error.message);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng nhập');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
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

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập email của bạn"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mật khẩu</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu của bạn"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Chưa có tài khoản?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
                <Text style={styles.signupLink}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAEAC7',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
    alignItems: 'center',
    marginBottom: 40,
  },
  mainImage: {
    width: width * 0.5,
    height: height * 0.25,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A8C6B',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#4A8C6B',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#4A8C6B',
    borderWidth: 1,
    borderColor: 'rgba(74, 140, 107, 0.3)',
  },
  loginButton: {
    backgroundColor: '#4A8C6B',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  signupText: {
    color: '#4A8C6B',
    fontSize: 16,
  },
  signupLink: {
    color: '#4A8C6B',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});