import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface CreateFolderDialogProps {
  visible: boolean;
  onClose: () => void;
  onCreateFolder: (folderName: string) => Promise<void>;
}

export const CreateFolderDialog: React.FC<CreateFolderDialogProps> = ({
  visible,
  onClose,
  onCreateFolder,
}) => {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!folderName.trim()) {
      setError('Folder name cannot be empty');
      return;
    }

    setError('');
    setIsCreating(true);

    try {
      await onCreateFolder(folderName.trim());
      setFolderName('');
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create folder');
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setFolderName('');
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
            Create New Folder
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Folder Name"
            value={folderName}
            onChangeText={setFolderName}
            autoFocus
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