import { FC, useEffect, useState } from 'react';
import DirectorySelector from '../components/DirectorySelector/DirectorySelector';
import { DirectoryEvent, FileInfo } from '../../main/types';
import DirectoryTable from '../components/DirectoryTable/DirectoryTable';
import { FileChangeEvent } from '../components/FileChangeLog/types';
import FileChangeLog from '../components/FileChangeLog/FileChangeLog';

const DirectoryWatcher: FC = () => {
  const [selectDir, setSelectedDir] = useState('');
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [logs, setLogs] = useState<FileChangeEvent[]>([]);

  const loadDirFiles = async () => {
    setFiles([]);
    const files = await window.directory.readFiles(selectDir);
    if (!files) return;
    setFiles(files);
    console.log(files);
  };

  const watchDirFiles = async () => {
    setLogs([]);
    window.ipcRenderer.receive(
      DirectoryEvent.FileUpdate,
      (ipcEvent, fileEvent, path) => {
        setLogs([...logs, { event: fileEvent, path } as FileChangeEvent]);
        // ** In case of new files we need to refetch dir files
        if (['add', 'addDir', 'unlink'].includes(fileEvent)) {
          // new files added reload
          loadDirFiles();
        }
      },
    );
  };

  useEffect(() => {
    if (!selectDir) return;
    loadDirFiles();
    watchDirFiles();
  }, [selectDir]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
    >
      <div>
        <DirectorySelector
          selectedDir={selectDir}
          onChange={(path) => {
            setSelectedDir(path);
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          paddingTop: '1rem',
        }}
      >
        <div style={{ width: '80%' }}>
          <DirectoryTable files={files} />
        </div>

        <div style={{ width: '20%', background: 'grey' }}>
          <FileChangeLog logs={logs} />
        </div>
      </div>
    </div>
  );
};

export default DirectoryWatcher;
