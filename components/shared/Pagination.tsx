import { useEffect, useState } from "react";
import cs from 'classnames';

interface IProp {
    totalPages: number;
    range: number;
    onClick: (selectedValue: number) => void;
    isBusy?: boolean;
}

function Pagination({ totalPages, range, onClick, isBusy }: IProp) {
    const [currentPage, setCurrentPage] = useState(1);
    const [startPointer, setStartPointer] = useState(1);
    const [endPointer, setEndPointer] = useState(range);
    const [pages, setPages] = useState<number[]>([]);

    const setFirstPages = () => {
        const newPages: number[] = [];
        const end = Math.min(range, totalPages);

        for (let i = 1; i <= end; i++) {
            newPages.push(i);
        }

        setPages(newPages);
        setStartPointer(1);
        setEndPointer(range);
        setCurrentPage(1);
        onClick(1);
    }

    const setPrvElipsePages = (isElipse: boolean) => {
        const newPages: number[] = [];
        const startIndex = Math.max(1, startPointer - range);
        const endIndex = startPointer - 1;
        let isEndPointerSet = false;

        for (let i = startIndex; i <= endIndex; i++) {
            newPages.push(i);
        }

        if (newPages.length < range) {
            const len = range - newPages.length;
            const start = newPages[newPages.length - 1] + 1;
            const end = start + len - 1;

            for (let i = start; i <= end; i++) {
                newPages.push(i);
            }

            setEndPointer(end);
            isEndPointerSet = true;
        }

        setPages(newPages);
        const currentValue = isElipse ? startIndex : endIndex;
        setCurrentPage(currentValue);
        onClick(currentValue);
        setStartPointer(startIndex);
        if (!isEndPointerSet) {
            setEndPointer(endIndex);
        }
    }

    const setPrvPages = () => {
        if (currentPage === startPointer && currentPage > 1) {
            setPrvElipsePages(false);
        } else if (currentPage > 1) {
            onClick(currentPage - 1);
            setCurrentPage(prv => prv - 1);
        }
    }

    const setLoopCurrentValue = (selectedValue: number) => {
        onClick(selectedValue);
        setCurrentPage(selectedValue);
    }

    const setNextElipsePages = (isElipse: boolean) => {
        const newPages: number[] = [];
        const startIndex = endPointer + 1;
        const endIndex = Math.min(startIndex + range - 1, totalPages);
        let isCurrentPageSet = false;

        for (let i = startIndex; i <= endIndex; i++) {
            newPages.push(i);
        }

        if (newPages.length < range) {
            const len = range - newPages.length;
            const start = newPages[0] - 1;
            const end = newPages[0] - len;

            for (let i = start; i >= end; i--) {
                newPages.unshift(i);
            }
            setStartPointer(end);
            if (isElipse) {
                setCurrentPage(end);
                onClick(end);
                isCurrentPageSet = true;
            }
        } else {
            setStartPointer(startIndex);
        }

        setPages(newPages);
        if (!isCurrentPageSet) {
            setCurrentPage(startIndex);
            onClick(startIndex);
        }
        setEndPointer(endIndex);
    }


    const setNextPages = () => {
        if (currentPage === endPointer && currentPage < totalPages) {
            setNextElipsePages(false);
        } else if (currentPage < endPointer && currentPage < totalPages) {
            onClick(currentPage + 1);
            setCurrentPage(prv => prv + 1);
        }
    }
    const setLastPages = () => {
        const newPages: number[] = [];
        const end = totalPages - range + 1;

        for (let i = totalPages; i >= end; i--) {
            newPages.unshift(i);
        }
        setPages(newPages);
        setCurrentPage(totalPages);
        onClick(totalPages);
        setStartPointer(end);
        setEndPointer(totalPages);
    }

    useEffect(setFirstPages, [range, totalPages])


    return (
        <div className="flex items-center justify-between p-1 text-gray-800 bg-white">
            <div>Page <span className='font-bold'>{currentPage}</span> of <span className='font-bold'>{totalPages}</span></div>
            <div className='space-x-2'>
                <button disabled={currentPage === 1 || isBusy} className={cs(currentPage === 1 && ' cursor-not-allowed')} onClick={setFirstPages}>First</button><span>|</span>
                <button disabled={currentPage === 1 || isBusy} className={cs(currentPage === 1 && ' cursor-not-allowed')} onClick={setPrvPages}>Prev</button>

                {startPointer > range && <button disabled={isBusy} className='font-bold' onClick={() => setPrvElipsePages(true)}>...</button>}

                {pages.map(page => <button key={page} disabled={currentPage === page || isBusy} className={cs('px-1 rounded-sm bg-gray-200', currentPage === page && 'bg-blue-300 font-bold cursor-not-allowed')} onClick={() => setLoopCurrentValue(page)}>{page}</button>)}

                {endPointer < totalPages && <button disabled={isBusy} className='font-bold' onClick={() => setNextElipsePages(true)}>...</button>}

                <button disabled={currentPage === totalPages || isBusy} className={cs(currentPage === totalPages && ' cursor-not-allowed')} onClick={setNextPages}>Next</button><span>|</span>
                <button disabled={currentPage === totalPages || isBusy} className={cs(currentPage === totalPages && ' cursor-not-allowed')} onClick={setLastPages}>Last</button>
            </div>
        </div>
    )
}

export default Pagination
