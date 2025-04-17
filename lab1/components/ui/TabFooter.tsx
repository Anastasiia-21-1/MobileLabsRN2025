import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function TabFooter() {
  const { bottom } = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <ThemedText style={styles.text}>Сергієнко Анастасія, ВТ-21-1</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingVertical: 5,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});