import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { fileSystemService } from '@/services/FileSystemService';

interface TextFileViewerProps {
  visible: boolean;
  filePath: string;
  fileName: string;
  onClose: () => void;
}

export const TextFileViewer: React.FC<TextFileViewerProps> = ({
  visible,
  filePath,
  fileName,
  onClose,
}) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (visible && filePath) {
      loadFileContent();
    }
  }, [visible, filePath]);

  const loadFileContent = async () => {
    try {
      setLoading(true);
      setError('');
      const fileContent = await fileSystemService.readTextFile(filePath);
      setContent(fileContent);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to read file');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="subtitle" style={styles.title}>
            {fileName}
          </ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : error ? (
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          ) : (
            <ScrollView style={styles.scrollView}>
              <ThemedText style={styles.content}>{content}</ThemedText>
            </ScrollView>
          )}
        </View>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});