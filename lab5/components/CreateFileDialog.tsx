import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface CreateFileDialogProps {
  visible: boolean;
  onClose: () => void;
  onCreateFile: (fileName: string, content: string) => Promise<void>;
}

export const CreateFileDialog: React.FC<CreateFileDialogProps> = ({
  visible,
  onClose,
  onCreateFile,
}) => {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!fileName.trim()) {
      setError('File name cannot be empty');
      return;
    }

    setError('');
    setIsCreating(true);

    try {
      await onCreateFile(fileName.trim(), fileContent);
      setFileName('');
      setFileContent('');
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create file');
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setFileName('');
    setFileContent('');
    setError('');
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText type="subtitle" style={styles.title}>
            Create New Text File
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder="File Name (will add .txt if needed)"
            value={fileName}
            onChangeText={setFileName}
            autoFocus
          />

          <TextInput
            style={[styles.input, styles.contentInput]}
            placeholder="File Content"
            value={fileContent}
            onChangeText={setFileContent}
            multiline
            numberOfLines={4}
          />

          {error ? <ThemedText style={styles.errorText}>{error}</ThemedText> : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              disabled={isCreating}
            >
              <ThemedText>Cancel</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.createButton]}
              onPress={handleCreate}
              disabled={isCreating}
            >
              <ThemedText style={styles.createButtonText}>
                {isCreating ? 'Creating...' : 'Create'}
              </ThemedText>
            </TouchableOpacity>
          </View>
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
  title: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  createButton: {
    backgroundColor: '#007AFF',
  },
  createButtonText: {
    color: 'white',
  },
});