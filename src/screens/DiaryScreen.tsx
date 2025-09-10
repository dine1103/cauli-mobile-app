import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  mood: string | null;
  created_at: string;
}

export default function DiaryScreen() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Vui vẻ', value: 'happy' },
    { emoji: '😌', label: 'Bình yên', value: 'peaceful' },
    { emoji: '😔', label: 'Buồn', value: 'sad' },
    { emoji: '😰', label: 'Lo lắng', value: 'anxious' },
    { emoji: '😤', label: 'Tức giận', value: 'angry' },
    { emoji: '😴', label: 'Mệt mỏi', value: 'tired' },
  ];

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading entries:', error);
      } else {
        setEntries(data || []);
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const handleSaveEntry = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tiêu đề và nội dung');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('diary_entries')
        .insert([
          {
            user_id: user.id,
            title: title.trim(),
            content: content.trim(),
            mood: selectedMood,
          },
        ]);

      if (error) {
        Alert.alert('Lỗi', 'Không thể lưu nhật ký');
      } else {
        Alert.alert('Thành công', 'Đã lưu nhật ký');
        setTitle('');
        setContent('');
        setSelectedMood(null);
        setIsWriting(false);
        loadEntries();
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi lưu nhật ký');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setSelectedMood(null);
    setIsWriting(false);
  };

  const renderEntry = ({ item }: { item: DiaryEntry }) => (
    <TouchableOpacity style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryTitle}>{item.title}</Text>
        {item.mood && (
          <Text style={styles.entryMood}>
            {moods.find(m => m.value === item.mood)?.emoji}
          </Text>
        )}
      </View>
      <Text style={styles.entryContent} numberOfLines={3}>
        {item.content}
      </Text>
      <Text style={styles.entryDate}>
        {new Date(item.created_at).toLocaleDateString('vi-VN')}
      </Text>
    </TouchableOpacity>
  );

  if (isWriting) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#CAEAC7', '#A8D8A8']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.headerButton}>Hủy</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Viết nhật ký</Text>
            <TouchableOpacity onPress={handleSaveEntry} disabled={loading}>
              <Text style={[styles.headerButton, loading && styles.headerButtonDisabled]}>
                {loading ? 'Đang lưu...' : 'Lưu'}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={styles.writingContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tiêu đề</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Nhập tiêu đề..."
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tâm trạng hôm nay</Text>
            <View style={styles.moodContainer}>
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood.value}
                  style={[
                    styles.moodButton,
                    selectedMood === mood.value && styles.moodButtonSelected
                  ]}
                  onPress={() => setSelectedMood(mood.value)}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={[
                    styles.moodLabel,
                    selectedMood === mood.value && styles.moodLabelSelected
                  ]}>
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nội dung</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="Hôm nay bạn cảm thấy thế nào? Hãy chia sẻ những suy nghĩ của bạn..."
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              maxLength={2000}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#CAEAC7', '#A8D8A8']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Nhật ký</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsWriting(true)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyTitle}>Chưa có nhật ký nào</Text>
            <Text style={styles.emptySubtitle}>
              Hãy bắt đầu viết nhật ký để ghi lại những suy nghĩ và cảm xúc của bạn
            </Text>
            <TouchableOpacity
              style={styles.startWritingButton}
              onPress={() => setIsWriting(true)}
            >
              <Text style={styles.startWritingButtonText}>Bắt đầu viết</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={entries}
            renderItem={renderEntry}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.entriesList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  headerButtonDisabled: {
    opacity: 0.6,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  writingContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moodButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    minWidth: 80,
  },
  moodButtonSelected: {
    backgroundColor: '#4A8C6B',
    borderColor: '#4A8C6B',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  moodLabelSelected: {
    color: 'white',
  },
  contentInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    height: 200,
  },
  entriesList: {
    paddingVertical: 20,
  },
  entryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  entryMood: {
    fontSize: 24,
  },
  entryContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  startWritingButton: {
    backgroundColor: '#4A8C6B',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  startWritingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
