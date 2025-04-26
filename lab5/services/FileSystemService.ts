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

  public async createFolder(parentPath: string, folderName: string): Promise<string> {
    try {
      const normalizedPath = parentPath.endsWith('/') ? parentPath : parentPath + '/';
      const folderPath = normalizedPath + folderName;

      const folderInfo = await FileSystem.getInfoAsync(folderPath);
      if (folderInfo.exists) {
        throw new Error('A folder with this name already exists');
      }

      await FileSystem.makeDirectoryAsync(folderPath);
      return folderPath;
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  public async createTextFile(parentPath: string, fileName: string, content: string): Promise<string> {
    try {
      const normalizedPath = parentPath.endsWith('/') ? parentPath : parentPath + '/';

      if (!fileName.endsWith('.txt')) {
        fileName = fileName + '.txt';
      }

      const filePath = normalizedPath + fileName;

      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        throw new Error('A file with this name already exists');
      }

      await FileSystem.writeAsStringAsync(filePath, content);
      return filePath;
    } catch (error) {
      console.error('Error creating text file:', error);
      throw error;
    }
  }

  public async readTextFile(filePath: string): Promise<string> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }

      if (fileInfo.isDirectory) {
        throw new Error('Cannot read a directory as a text file');
      }

      const content = await FileSystem.readAsStringAsync(filePath);
      return content;
    } catch (error) {
      console.error('Error reading text file:', error);
      throw error;
    }
  }

  public async updateTextFile(filePath: string, content: string): Promise<void> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }

      if (fileInfo.isDirectory) {
        throw new Error('Cannot update a directory as a text file');
      }

      await FileSystem.writeAsStringAsync(filePath, content);
    } catch (error) {
      console.error('Error updating text file:', error);
      throw error;
    }
  }

  public async deleteFileOrFolder(path: string): Promise<void> {
    try {
      const info = await FileSystem.getInfoAsync(path);
      if (!info.exists) {
        throw new Error('File or folder does not exist');
      }

      await FileSystem.deleteAsync(path, { idempotent: true });
    } catch (error) {
      console.error('Error deleting file or folder:', error);
      throw error;
    }
  }
}

export const fileSystemService = new FileSystemService();
