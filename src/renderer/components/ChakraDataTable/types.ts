import { ColumnDef } from "@tanstack/react-table";

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
  };