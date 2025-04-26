import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from './ThemedView';

interface NavigationControlsProps {
  canGoUp: boolean;
  onGoUp: () => void;
  onCreateFolder: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({ canGoUp, onGoUp }) => {
export const NavigationControls: React.FC<NavigationControlsProps> = ({ 
  canGoUp, 
  onGoUp,
  onCreateFolder,
}) => {
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !canGoUp && styles.disabledButton]}
        onPress={onGoUp}
        disabled={!canGoUp}
      >
        <Ionicons name="arrow-up" size={24} color={canGoUp ? '#007AFF' : '#CCCCCC'} />
      </TouchableOpacity>

      <View style={styles.spacer} />

      <TouchableOpacity
        style={styles.button}
        onPress={onCreateFolder}
      >
        <Ionicons name="folder-open" size={24} color="#007AFF" />
      </TouchableOpacity>
        <Ionicons name="document-text" size={24} color="#007AFF" />
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
  spacer: {
    flex: 1,
  },
});
