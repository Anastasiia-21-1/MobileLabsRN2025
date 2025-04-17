import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { PhotoGallery } from '@/components/PhotoGallery';

export default function PhotosScreen() {
  return (
    <ThemedView style={styles.container}>
      <PhotoGallery />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0, // Remove top padding for full-screen grid
  },
});
