import { BrowserWindow, ipcMain, dialog, IpcMainInvokeEvent } from 'electron';
import { readdir } from 'fs/promises';
import { DirectoryEvent, FileInfo } from './types';
import path from 'path';
import { statSync } from 'fs';
import chokidar from 'chokidar';

export default class DirectoryHelper {
  mainWindow: BrowserWindow;
  watcher?: chokidar.FSWatcher;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  setup = () => {
    ipcMain.handle(DirectoryEvent.SelectFolder, this.handleSelectFolder);
    ipcMain.handle(DirectoryEvent.ReadFiles, this.handleReadFiles);
  };

  handleReadFiles = async (
    event: IpcMainInvokeEvent,
    dir: string,
  ): Promise<FileInfo[]> => {
    const files = await readdir(dir, { withFileTypes: true });
    return files.map((file) => {
      const isDirectory = file.isDirectory();
      const filePath = path.join(dir, file.name);
      const stats = statSync(filePath);

      if (isDirectory)
        return {
          isDirectory,
          name: file.name,
          createdAt: stats.birthtime.getTime(),
        };

      return {
        isDirectory,
        name: file.name,
        extension: path.extname(filePath),
        size: stats.size,
        modifiedAt: stats.mtimeMs,
        createdAt: stats.birthtime.getTime(),
      };
    });
  };

  handleSelectFolder = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(
      this.mainWindow,
      {
        properties: ['openDirectory'],
      },
    );
    if (canceled) {
      return;
    } else {
      const path = filePaths[0];
      // close existing listeners
      this.watcher?.close();
      // setup new listeners
      this.watchFiles(path);

      return path;
    }
  };

  watchFiles = (path: string) => {
    this.watcher = chokidar.watch(path, { depth: 1, ignoreInitial: true });
    const fileChangeHanlder = (event: string, path: string) => {
      this.mainWindow.webContents.send(DirectoryEvent.FileUpdate, event, path);
    };
    this.watcher.on('all', fileChangeHanlder);
  };
}
