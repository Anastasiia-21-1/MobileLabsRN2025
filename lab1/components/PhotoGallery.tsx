import React from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import { ThemedView } from './ThemedView';
import { PhotoItem } from './PhotoItem';
import { photoData } from "@/data";

const { width } = Dimensions.get('window');
const numColumns = 2;
const itemWidth = (width - 32) / numColumns; // Calculate item width accounting for margins

export function PhotoGallery() {
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={photoData}
        keyExtractor={(item, index) => `photo-item-${index}`}
        renderItem={({ item }) => (
          <PhotoItem
            image={item.image}
            title={item.title} // Still passing title for data compatibility
          />
        )}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
