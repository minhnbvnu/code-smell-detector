function SummaryTableHeaderCell({ name, onSort, sortKey, activeSort }) {
    const { newSort, sortClass } = getSortDetails(sortKey, activeSort);
    return (
        <th
            className={'sortable headercell ' + sortClass}
            onClick={() => onSort(newSort)}
        >
            {name}
            <span className="sorter" />
        </th>
    );
}