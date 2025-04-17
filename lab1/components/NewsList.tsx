import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ThemedView} from './ThemedView';
import {NewsItem} from './NewsItem';
import {newsData} from "@/data";

export function NewsList() {
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={newsData}
        keyExtractor={(item, index) => `news-item-${index}`}
        renderItem={({item}) => (
          <NewsItem
            image={item.image}
            name={item.name}
            description={item.description}
          />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    marginBottom: 12,
  },
});
