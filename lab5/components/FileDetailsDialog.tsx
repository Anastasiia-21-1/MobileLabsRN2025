import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View, ActivityIndicator } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fileSystemService } from '@/services/FileSystemService';

interface FileDetailsDialogProps {
  visible: boolean;
  filePath: string;
  onClose: () => void;
}

export const FileDetailsDialog: React.FC<FileDetailsDialogProps> = ({
  visible,
  filePath,
  onClose,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [fileDetails, setFileDetails] = useState<{
    name: string;
    type: string;
    size: number;
    modificationTime: number;
    isDirectory: boolean;
  } | null>(null);

  useEffect(() => {
    if (visible && filePath) {
      loadFileDetails();
    }
  }, [visible, filePath]);

  const loadFileDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const details = await fileSystemService.getFileDetails(filePath);
      setFileDetails(details);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to load file details');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number): string => {
    if (!timestamp) return 'Unknown';
    
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <View style={styles.header}>
            <ThemedText type="subtitle" style={styles.title}>
              File Details
            </ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
          ) : error ? (
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          ) : fileDetails ? (
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>Name:</ThemedText>
                <ThemedText style={styles.detailValue}>{fileDetails.name}</ThemedText>
              </View>
              
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>Type:</ThemedText>
                <ThemedText style={styles.detailValue}>{fileDetails.type}</ThemedText>
              </View>
              
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>Size:</ThemedText>
                <ThemedText style={styles.detailValue}>{formatSize(fileDetails.size)}</ThemedText>
              </View>
              
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>Modified:</ThemedText>
                <ThemedText style={styles.detailValue}>{formatDate(fileDetails.modificationTime)}</ThemedText>
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.closeFullButton}
            onPress={onClose}
          >
            <ThemedText style={styles.closeButtonText}>Close</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
  },
  closeButton: {
    padding: 5,
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: '30%',
  },
  detailValue: {
    flex: 1,
  },
  closeFullButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});