import { ChakraProvider } from '@chakra-ui/react';
import { FC } from 'react';
import { DataTable } from '../ChakraDataTable/ChakraDataTable';
import { DirectoryTableProps } from './types';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { FileInfo } from '../../../main/types';
import { dateToDateTime } from '../../utils/date-time';

const DirectoryTable: FC<DirectoryTableProps> = ({ files }) => {
  const columnHelper = createColumnHelper<FileInfo>();

  const columns: any = [
    columnHelper.accessor('name', {
      header: 'File Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('size', {
      header: 'File Size',
    }),
    columnHelper.accessor('extension', {
      header: 'Type',
      cell: (info) => {
        if (info.row.original.isDirectory) return 'folder';
        return info.getValue();
      },
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created At',
      cell: (info) => {
        if (!info.getValue()) return '-';
        return dateToDateTime(new Date(info.getValue() as number));
      },
    }),
    columnHelper.accessor('modifiedAt', {
      header: 'Modified At',
      cell: (info) => {
        if (!info.getValue()) return '-';
        return dateToDateTime(new Date(info.getValue() as number));
      },
    }),
  ];

  return (
    <ChakraProvider>
      <DataTable<FileInfo> columns={columns} data={files} />
    </ChakraProvider>
  );
};

export default DirectoryTable;
