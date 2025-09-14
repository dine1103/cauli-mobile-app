import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cauli App</Text>
      <Text style={styles.subtitle}>Test App is working!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CAEAC7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A8C6B',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#4A8C6B',
  },
});
