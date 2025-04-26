import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ThemedView} from '@/components/ThemedView';
import {FileList} from '@/components/FileList';
import {PathDisplay} from '@/components/PathDisplay';
import {NavigationControls} from '@/components/NavigationControls';
import {FileSystemEntry, fileSystemService} from "@/services/FileSystemService";

export default function HomeScreen() {
  const [currentPath, setCurrentPath] = useState<string>('');
  const [directoryContents, setDirectoryContents] = useState<FileSystemEntry[]>([]);

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
        />

        <FileList
          entries={directoryContents}
          onEntryPress={handleEntryPress}
        />
      </ThemedView>
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
