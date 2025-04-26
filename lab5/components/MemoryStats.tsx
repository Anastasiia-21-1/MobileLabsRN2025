import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';

interface MemoryStatsProps {
  totalStorage?: number;
  freeStorage?: number;
}

export const MemoryStats: React.FC<MemoryStatsProps> = ({
  totalStorage = 64 * 1024 * 1024 * 1024, // 64 GB
  freeStorage = 32 * 1024 * 1024 * 1024,  // 32 GB
}) => {
  const usedStorage = totalStorage - freeStorage;
  const usedPercentage = (usedStorage / totalStorage) * 100;
  
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="hardware-chip-outline" size={24} color="#007AFF" style={styles.icon} />
        <ThemedText type="subtitle" style={styles.title}>Storage Usage</ThemedText>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <ThemedText style={styles.statLabel}>Total Storage:</ThemedText>
          <ThemedText style={styles.statValue}>{formatSize(totalStorage)}</ThemedText>
        </View>
        
        <View style={styles.statItem}>
          <ThemedText style={styles.statLabel}>Free Space:</ThemedText>
          <ThemedText style={styles.statValue}>{formatSize(freeStorage)}</ThemedText>
        </View>
        
        <View style={styles.statItem}>
          <ThemedText style={styles.statLabel}>Used Space:</ThemedText>
          <ThemedText style={styles.statValue}>{formatSize(usedStorage)}</ThemedText>
        </View>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${usedPercentage}%` }]} />
        <ThemedText style={styles.progressText}>{usedPercentage.toFixed(1)}% Used</ThemedText>
      </View>
      
      <ThemedText style={styles.note}>
        Note: These are simulated values. In a real app, you would need to use device-specific APIs to get actual storage information.
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
  },
  statsContainer: {
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontWeight: 'bold',
  },
  statValue: {
    color: '#007AFF',
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 10,
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  note: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#999999',
    marginTop: 8,
  },
});