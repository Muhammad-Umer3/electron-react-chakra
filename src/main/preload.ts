// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
import { DirectoryEvent, FileInfo } from './types';

const ipcHanlder = {
  receive: (channel: string, func: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
  }
}


contextBridge.exposeInMainWorld('ipcRenderer', ipcHanlder);


const directoryHandler = {
  selectFolder: (): Promise<string> =>
    ipcRenderer.invoke(DirectoryEvent.SelectFolder),
  readFiles: (path: string): Promise<FileInfo[]> =>
    ipcRenderer.invoke(DirectoryEvent.ReadFiles, path)
};

contextBridge.exposeInMainWorld('directory', directoryHandler);

export type DirectoryHandler = typeof directoryHandler;
export type IpcRendererHandler = typeof ipcHanlder;
