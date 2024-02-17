import { FC } from 'react';
import { DirectorySelectorProps } from './types';

const DirectorySelector: FC<DirectorySelectorProps> = ({
  selectedDir,
  onChange,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '70%' }}>
        <input value={selectedDir} readOnly />
      </div>

      <div>
        <button
          onClick={async () => {
            const directory = await window.directory.selectFolder();
            if (!directory) return;
            onChange(directory);
          }}
        >
          Select Folder
        </button>
      </div>
    </div>
  );
};

export default DirectorySelector;
