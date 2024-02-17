import { FC, useEffect, useState } from 'react';
import { FileChangeLog } from './types';

const FileChangeLog: FC<FileChangeLog> = ({ logs }) => {
  return (
    <div style={{ color: 'white' }}>
      <h6>Change Console:</h6>
      {logs.map((item) => (
        <>
          {item.event} : {item.path}
        </>
      ))}
    </div>
  );
};

export default FileChangeLog;
