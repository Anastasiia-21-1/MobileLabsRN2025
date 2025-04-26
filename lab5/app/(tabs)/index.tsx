import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ThemedView} from '@/components/ThemedView';
import {FileList} from '@/components/FileList';
import {PathDisplay} from '@/components/PathDisplay';
import {NavigationControls} from '@/components/NavigationControls';
import {CreateFolderDialog} from '@/components/CreateFolderDialog';
import {CreateFileDialog} from '@/components/CreateFileDialog';
import {TextFileViewer} from '@/components/TextFileViewer';
import {DeleteConfirmationDialog} from '@/components/DeleteConfirmationDialog';
import {FileSystemEntry, fileSystemService} from "@/services/FileSystemService";

export default function HomeScreen() {
  const [currentPath, setCurrentPath] = useState<string>('');
  const [directoryContents, setDirectoryContents] = useState<FileSystemEntry[]>([]);
  const [isFolderDialogVisible, setIsFolderDialogVisible] = useState(false);
  const [isFileDialogVisible, setIsFileDialogVisible] = useState(false);
  const [isTextFileViewerVisible, setIsTextFileViewerVisible] = useState(false);
  const [currentTextFile, setCurrentTextFile] = useState<{ path: string; name: string } | null>(null);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<FileSystemEntry | null>(null);

  useEffect(() => {
    const initializeFileSystem = async () => {
      const basePath = fileSystemService.getBaseDirectory();
      setCurrentPath(basePath);
      await loadDirectoryContents(basePath);
    };

    initializeFileSystem();
  }, []);

  const loadDirectoryContents = async (path: string) => {
    try {
      const contents = await fileSystemService.getDirectoryContents(path);
      setDirectoryContents(contents);
    } catch (error) {
      console.error('Error loading directory contents:', error);
      setDirectoryContents([]);
    }
  };

  const handleEntryPress = (entry: FileSystemEntry) => {
    if (entry.isDirectory) {
      setCurrentPath(entry.uri);
      loadDirectoryContents(entry.uri);
    } else if (entry.name.endsWith('.txt')) {
      setCurrentTextFile({ path: entry.uri, name: entry.name });
      setIsTextFileViewerVisible(true);
    }
  };

  const handleGoUp = () => {
    const parentPath = fileSystemService.getParentDirectory(currentPath);
    if (parentPath) {
      setCurrentPath(parentPath);
      loadDirectoryContents(parentPath);
    }
  };

  const canGoUp = currentPath !== fileSystemService.getBaseDirectory();

  const handleCreateFolder = async (folderName: string) => {
    try {
      await fileSystemService.createFolder(currentPath, folderName);
      await loadDirectoryContents(currentPath);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const handleCreateFile = async (fileName: string, content: string) => {
    try {
      await fileSystemService.createTextFile(currentPath, fileName, content);
      await loadDirectoryContents(currentPath);
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  const handleDeletePress = (entry: FileSystemEntry) => {
    setItemToDelete(entry);
    setIsDeleteDialogVisible(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      await fileSystemService.deleteFileOrFolder(itemToDelete.uri);
      await loadDirectoryContents(currentPath);
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setItemToDelete(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.fileManager}>
        <PathDisplay
          currentPath={currentPath}
          basePath={fileSystemService.getBaseDirectory()}
        />

        <NavigationControls
          canGoUp={canGoUp}
          onGoUp={handleGoUp}
          onCreateFolder={() => setIsFolderDialogVisible(true)}
          onCreateFile={() => setIsFileDialogVisible(true)}
        />

        <FileList
          entries={directoryContents}
          onEntryPress={handleEntryPress}
          onDeletePress={handleDeletePress}
        />
      </ThemedView>

      <CreateFolderDialog
        visible={isFolderDialogVisible}
        onClose={() => setIsFolderDialogVisible(false)}
        onCreateFolder={handleCreateFolder}
      />

      <CreateFileDialog
        visible={isFileDialogVisible}
        onClose={() => setIsFileDialogVisible(false)}
        onCreateFile={handleCreateFile}
      />

      {currentTextFile && (
        <TextFileViewer
          visible={isTextFileViewerVisible}
          filePath={currentTextFile.path}
          fileName={currentTextFile.name}
          onClose={() => setIsTextFileViewerVisible(false)}
        />
      )}

      {itemToDelete && (
        <DeleteConfirmationDialog
          visible={isDeleteDialogVisible}
          itemName={itemToDelete.name}
          isDirectory={itemToDelete.isDirectory}
          onClose={() => setIsDeleteDialogVisible(false)}
          onDelete={handleDelete}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fileManager: {
    flex: 1,
  },
});
