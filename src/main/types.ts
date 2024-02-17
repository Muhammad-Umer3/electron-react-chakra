export enum DirectoryEvent {
    SelectFolder = 'select-folder',
    ReadFiles = 'read-files',
    FileUpdate = 'file-update'
}

export type FileInfo = {name: string, isDirectory: boolean, createdAt: number} & (DirInfo | SingleFileInfo);

interface DirInfo {
   isDirectory: true;
}

type SingleFileInfo = {
  isDirectory: false,
  size: number,
  extension: string,
  modifiedAt: number
}

