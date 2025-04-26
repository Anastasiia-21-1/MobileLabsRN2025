import * as FileSystem from 'expo-file-system';

export interface FileSystemEntry {
  name: string;
  uri: string;
  isDirectory: boolean;
}

class FileSystemService {
  private readonly baseDirectory: string;

  constructor() {
    this.baseDirectory = FileSystem.documentDirectory + 'AppData/';
    this.initDirectories();
  }

  public getBaseDirectory(): string {
    return this.baseDirectory;
  }

  public async initDirectories(): Promise<void> {
    const dirInfo = await FileSystem.getInfoAsync(this.baseDirectory);

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(this.baseDirectory, {intermediates: true});
    }

    await FileSystem.makeDirectoryAsync(this.baseDirectory + 'Documents', {intermediates: true});
    await FileSystem.writeAsStringAsync(this.baseDirectory + 'file.txt', 'Text content');
  }

  public async getDirectoryContents(directoryPath: string): Promise<FileSystemEntry[]> {
    try {
      const contents = await FileSystem.readDirectoryAsync(directoryPath);
      
      const contentPromises = contents.map(async (name) => {
        const uri = directoryPath + (directoryPath.endsWith('/') ? '' : '/') + name;
        const info = await FileSystem.getInfoAsync(uri);
        
        return {
          name,
          uri,
          isDirectory: info.isDirectory || false,
        };
      });
      
      return Promise.all(contentPromises);
    } catch (error) {
      console.error('Error reading directory contents:', error);
      return [];
    }
  }

  public getParentDirectory(path: string): string | null {
    if (path === this.baseDirectory) {
      return null;
    }
    
    const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
    
    const lastSlashIndex = normalizedPath.lastIndexOf('/');
    if (lastSlashIndex === -1) {
      return null;
    }
    
    const parentPath = normalizedPath.substring(0, lastSlashIndex + 1);
    
    if (parentPath.length < this.baseDirectory.length) {
      return this.baseDirectory;
    }
    
    return parentPath;
  }
}

export const fileSystemService = new FileSystemService();