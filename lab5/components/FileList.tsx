import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { FileSystemEntry } from '@/services/FileSystemService';

interface FileListProps {
  entries: FileSystemEntry[];
  onEntryPress: (entry: FileSystemEntry) => void;
}

export const FileList: React.FC<FileListProps> = ({ entries, onEntryPress }) => {
  const renderItem = ({ item }: { item: FileSystemEntry }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => onEntryPress(item)}
      >
        <ThemedView style={styles.itemContent}>
          <Ionicons
            name={item.isDirectory ? 'folder' : 'document'}
            size={24}
            color={item.isDirectory ? '#FFD700' : '#A9A9A9'}
            style={styles.icon}
          />
          <ThemedText style={styles.itemName}>{item.name}</ThemedText>
        </ThemedView>
      </TouchableOpacity>
    );
  };

  if (entries.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText>This folder is empty</ThemedText>
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={entries}
      renderItem={renderItem}
      keyExtractor={(item) => item.uri}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});