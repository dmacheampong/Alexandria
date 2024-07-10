import { createColumnHelper } from "@tanstack/react-table";

type Item = {
    id: number,
    name: string,
    coverURL: string,
    type: string,
    genre: string,
    author: string,
    publisher: string,
    status: string,
};

const columnHelper = createColumnHelper<Item>();

export const columnDef = [
    columnHelper.accessor(row => row.coverURL, {
        cell: info => <img src={info.getValue()} alt='Cover N/A' width={75} />,
        header: 'Cover',
        enableColumnFilter: false,
        footer: 'Cover',
    }),  
    columnHelper.accessor(row => row.name, {
        cell: info => info.getValue(),
        header: 'Name',
        footer: 'Name',
    }),  
    columnHelper.accessor(row => row.type, {
        cell: info => info.getValue(),
        header: 'Media Type',
        footer: 'Media Type'
    }),
    columnHelper.accessor(row => row.genre, {
        cell: info => info.getValue(),
        header: 'Genre',
        footer: 'Genre'
    }),
    columnHelper.accessor(row => row.author, {
        cell: info => info.getValue(),
        header: 'Author',
        footer: 'Author'
    }),
    columnHelper.accessor(row => row.publisher, {
        cell: info => info.getValue(),
        header: 'Publisher',
        footer: 'Publisher'
    }),
    columnHelper.accessor(row => row.status, {
        cell: info => info.getValue(),
        header: 'Status',
        footer: 'Status'
    }),
];