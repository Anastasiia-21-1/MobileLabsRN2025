import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedView } from './ThemedView';

// Calculate dimensions for a strict 2-column grid
const { width } = Dimensions.get('window');
const numColumns = 2;
const itemWidth = (width - 32) / numColumns; // Account for margins
const itemHeight = itemWidth; // Square images for grid

export interface PhotoItemProps {
  image: ImageSourcePropType;
  title: string; // Keeping this for data compatibility, but not displaying it
}

export function PhotoItem({ image }: PhotoItemProps) {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <ThemedView style={styles.container}>
        <Image source={image} style={styles.image} />
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: itemWidth - 8, // Account for margins
    height: itemHeight - 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
