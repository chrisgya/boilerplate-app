import { useState } from 'react';
import cx from "classnames";
import { format, parseISO } from "date-fns";
import Pagination from './Pagination';
import Spin from '../../public/Spin';
import { FontAwesomeIcon, faChevronRight, faChevronDown, faChevronUp } from '../../utils/svgs';

interface IProp {
    data: any[];
    headers: any[];
    title?: string;
    loadingData?: boolean;
    onMultiSelect?: (selectedRows: any[], checkedAll: boolean) => void;
    onSelect?: (selectedRow: any) => void;
    totalElements?: number;
    totalPages?: number;
    pagesRange?: number;
    onPageSelected?: (selectedValue: number) => void;
    onMainAddButtonClick?: () => void;
    onSort?: (field: string, direction: string) => void;
}


const Table = ({ data, headers, title, loadingData, onMultiSelect, onSelect, totalElements, totalPages, pagesRange, onPageSelected, onMainAddButtonClick, onSort }: IProp) => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [removedRows, setRemovedRows] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
    const [checkedAll, setCheckedAll] = useState(false);
    const [allWasChecked, setAllWasChecked] = useState(false);
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<string | null>(null);
    const [sortIcon, setSortIcon] = useState(faChevronRight);


    const onRowSelect = (row: any) => {
        if (onSelect) {
            setSelectedIndex(row['id']);
            onSelect(row);
        }
    }

    const onSorting = (field: string) => {
        let sortDir = sortDirection;
        if (sortField === field) {
            if (sortDirection === null || sortDirection === 'desc') {
                sortDir = 'asc';
                setSortDirection(sortDir);
                setSortIcon(faChevronDown);
            } else if (sortDirection === 'asc') {
                sortDir = 'desc';
                setSortDirection(sortDir);
                setSortIcon(faChevronUp);
            }
        } else {
            sortDir = 'asc';
            setSortDirection(sortDir);
            setSortIcon(faChevronDown);
        }
        setSortField(field);
        if (onSort) {
            onSort(field, sortDir as string);
        }
    }


    const setCheckedItem = (selRow: any) => {
        const newSelection = [...selectedRows];
        const index = getRowIndex(newSelection, selRow);
        let rowsRemovedLength = removedRows.length;
        if (index > -1) {
            const removedRow = newSelection.splice(index, 1);
            if (allWasChecked) {
                rowsRemovedLength++;
                setRemovedRows(prv => [...prv, removedRow[0]]);
            }
        } else {
            newSelection.push(selRow);
            if (allWasChecked) {
                if (getRowIndex(removedRows, selRow) > -1) {
                    rowsRemovedLength--;
                    const rows = removedRows.filter(row => JSON.stringify(row) !== JSON.stringify(selRow))
                    setRemovedRows(rows);
                }
            }
        }

        setSelectedRows(newSelection);
        const allSelected = newSelection.length === totalElements ? true : allWasChecked && rowsRemovedLength < 1 ? true : false;
        setCheckedAll(allSelected);
        if (onMultiSelect) onMultiSelect(newSelection, allSelected);
    }


    const setAllCheckedItems = () => {
        let newSelection = [...selectedRows];
        const newCheckedAll = !checkedAll;
        if (!newCheckedAll) {
            newSelection = [];
        } else {
            data.forEach(r => {
                const indx = getRowIndex(newSelection, r);
                if (indx > -1) {
                    newSelection.splice(indx, 1);
                }
            });

        }
        setSelectedRows(newSelection);
        setRemovedRows([]);
        setCheckedAll(newCheckedAll);
        setAllWasChecked(newCheckedAll);
        if (onMultiSelect) onMultiSelect(newSelection, newCheckedAll);
    }

    const isChecked = (selRow: any) => {
        if (checkedAll) {
            if (!rowExists(selectedRows, selRow)) { setSelectedRows(prv => [...prv, selRow]); }
            return true;
        }
        if (allWasChecked) {
            if (rowExists(removedRows, selRow)) {
                return false;
            } else {
                if (!rowExists(selectedRows, selRow)) { setSelectedRows(prv => [...prv, selRow]); }
                return true;
            }

        }

        return rowExists(selectedRows, selRow) ? true : false;
    }

    const rowExists = (rows: any[], selRow: any) => {
        return rows.findIndex(row => JSON.stringify(row) === JSON.stringify(selRow)) > -1;
    }
    const getRowIndex = (rows: any[], selRow: any) => {
        return rows.findIndex(row => JSON.stringify(row) === JSON.stringify(selRow));
    }


    const formatData = (type: string, currentData: any) => {
        switch (type) {
            case 'date':
                return format(parseISO(currentData), 'dd MMM yyyy H:m');
            case 'currency':
                return currentData; //@TODO: format accordingly
            default:
                return currentData;
        }
    }


    return (
        <>
            <div className='flex items-center justify-between'>
                <div className='text-base font-bold text-gray-600'>{title}</div>
                <div className='space-x-2'>
                    {onMainAddButtonClick && <button className='px-3 py-1 my-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-sm shadow-xl focus:ring focus:outline-none bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700' onClick={onMainAddButtonClick}>Add+</button>}
                </div>
            </div>
            <div className="relative shadow-md table-responsive-vertical shadow-z-1">
                {loadingData && <div className="absolute w-10 h-10 text-blue-700 top-2/4 left-2/4"><Spin /></div>}
                <table id="table" className="table table-hover table-mc-light-blue">
                    <thead>
                        <tr>
                            {onMultiSelect && <th> <input id="checkAll" className="cursor-pointer" type="checkbox" onChange={setAllCheckedItems} checked={checkedAll} /></th>}
                            <th>#</th>
                            {headers.map(h => <th key={h.key}>{h.title} {onSort && <FontAwesomeIcon icon={h.key === sortField ? sortIcon : faChevronRight} onClick={() => onSorting(h.key)} className='float-right w-3 h-3 cursor-pointer' />}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) =>
                            <tr key={d['id']} className={cx(onSelect && 'cursor-pointer', selectedIndex && selectedIndex === d['id'] && 'font-bold bg-yellow-300')} onClick={() => onRowSelect(d)}>
                                {onMultiSelect && <td> <input id="checkitem" className="cursor-pointer" type="checkbox" checked={isChecked(d)} onChange={() => setCheckedItem(d)} /></td>}
                                <td data-title="#">{i + 1}</td>
                                {headers.map((h, key) => <td data-title={h.title} key={key}>{formatData(h.type, d[h.key])}</td>)}
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
            { onPageSelected && <Pagination isBusy={loadingData} totalPages={totalPages!} range={pagesRange!} onClick={(value) => onPageSelected(value)} />}

        </>
    )
}

export default Table
