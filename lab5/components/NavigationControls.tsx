import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from './ThemedView';

interface NavigationControlsProps {
  canGoUp: boolean;
  onGoUp: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({ canGoUp, onGoUp }) => {
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !canGoUp && styles.disabledButton]}
        onPress={onGoUp}
        disabled={!canGoUp}
      >
        <Ionicons name="arrow-up" size={24} color={canGoUp ? '#007AFF' : '#CCCCCC'} />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
});