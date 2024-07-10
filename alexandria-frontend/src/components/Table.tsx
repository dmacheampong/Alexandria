import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
//import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';
import { flexRender, ColumnFiltersState, PaginationState, SortingState, getCoreRowModel,
        getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable} from '@tanstack/react-table';
import { columnDef } from './columns';
import axios from 'axios';
import { DebouncedInput } from './DebouncedInput';

export const Table = () => {
    const [items, setItems] = useState([]);

    const columns = useMemo(() => columnDef, []);
    const data = useMemo(() => items,[items]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    
    useEffect(() => {
        loadItems();
      }, []);

    const loadItems = async () => {
        const result = await axios.get("http://localhost:8080/items");
        setItems(result.data);
    };

    const deleteItem = async (id: number) => {
        await axios.delete(`http://localhost:8080/item/${id}`);
        loadItems();
    };

    const table = useReactTable({
        defaultColumn: {
            size: 50,
            minSize: 50,
            maxSize: 500,
        },
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        manualPagination: false,
        state : {
            columnFilters,
            globalFilter,
            sorting,
            pagination,
        },
    })

  return (
    <div className="py-1">
        <div className='py-2'>
            <DebouncedInput className='p-2 font-lg shadow border border-block border rounded p-1'
            placeholder='Search...'
             value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}/>
        </div>
        <table className="table border shadow">
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder ? null : (
                                    <>
                                    <div {...{
                                        className: header.column.getCanSort() ? 'cursor-pointer select-none': '',
                                        onClick: header.column.getToggleSortingHandler()
                                        }}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{asc: '\u2193', desc: '\u2191'}[header.column.getIsSorted() as string ?? null]}
                                    </div>
                                    {header.column.getCanFilter() ? (
                                        <div>
                                            <DebouncedInput
                                                value={(header.column.getFilterValue() || '') as string}
                                                placeholder={`Search...`}
                                                onChange={value => header.column.setFilterValue(String(value))}
                                                className="w-36 border shadow rounded"/>
                                        </div>
                                    ): null}
                                    
                                    </>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell =>(
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                            <Link className='btn text-white mx-2 bg-dark py-1' to={`/view-item/${row.original.id}`}>
                                View
                            </Link>
                            <Link className='btn text-warning mx-2 bg-dark py-1' to={`/edit-item/${row.original.id}`}>
                                Edit
                            </Link>
                            <button className='btn text-danger mx-2 bg-dark py-1' onClick={() => deleteItem(row.original.id)}>
                                Delete
                            </button>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className='h-2' />
        <div className='flex items-center gap-2'>
            <button className='border rounded p-1'
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
            >
            {'<<'}
            </button>
            <button className='border rounded p-1'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
            {'<'}
            </button>
            <button className='border rounded p-1'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
             {'>'}
            </button>
            <button className='border rounded p-1'
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
            >
            {'>>'}
            </button>
            <span className='flex items-center gap-1'>
                <div>
                    <strong>
                        Page {' '}
                        {table.getState().pagination.pageIndex + 1} of {' '}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </div>
            </span>
            <span className='flex items-center gap-1'>
                <strong>Go to page: {''}</strong>
                <input 
                    type='number'
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1: 0;
                        table.setPageIndex(page);
                    }}
                    className='border p-1 rounded w-16'
                />
            </span>
            <select
                value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                {[10, 20, 30, 40, 50].map(
                    (pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
            </select>
        </div>
    </div>
  )
};
