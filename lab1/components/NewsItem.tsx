import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {ThemedText} from './ThemedText';
import {ThemedView} from './ThemedView';

export interface NewsItemProps {
  image: ImageSourcePropType;
  name: string;
  description: string;
}

export function NewsItem({image, name, description}: NewsItemProps) {
  return (
    <ThemedView style={styles.container}>
      <Image source={image} style={styles.image}/>
      <View style={styles.content}>
        <ThemedText type="defaultSemiBold" style={styles.name}>{name}</ThemedText>
        <ThemedText style={styles.description}>{description}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
});
