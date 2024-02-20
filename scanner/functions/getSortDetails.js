function getSortDetails(sortKey, activeSort) {
    let newSort = { sortKey, order: 'desc' };
    let sortClass = '';
    if (activeSort && activeSort.sortKey === sortKey) {
        sortClass = 'sorted';
        if (activeSort.order === 'desc') {
            sortClass += '-desc';
            newSort.order = 'asc';
        } else {
            if (sortKey !== 'file') {
                newSort = { sortKey: 'file', order: 'desc' };
            }
        }
    }

    return {
        newSort,
        sortClass
    };
}