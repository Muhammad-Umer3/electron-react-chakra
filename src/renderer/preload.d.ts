import { DirectoryHandler, IpcRendererHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    directory: DirectoryHandler;
    ipcRenderer: IpcRendererHandler;
  }
}

export {};
