export interface FileChangeEvent {
  event: string;
  path: string;
}

export interface FileChangeLog {
  logs: FileChangeEvent[];
}
