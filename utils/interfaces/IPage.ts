export interface IPage<T> {
    content: T[],
    pageable: IPageable,
    last: boolean,
    totalElements: number,
    totalPages: number,
    numberOfElements: number,
    first: boolean,
    number: number,
    size: number,
    sort: ISort,
    empty: boolean
}

interface IPageable {
    sort: ISort,
    pageSize: number,
    pageNumber: number,
    offset: number,
    paged: boolean,
    unpaged: boolean
}

interface ISort {
    sorted: boolean,
    unsorted: boolean,
    empty: boolean
}