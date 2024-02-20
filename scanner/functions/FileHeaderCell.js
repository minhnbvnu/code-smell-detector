function FileHeaderCell({ onSort, activeSort }) {
    const { newSort, sortClass } = getSortDetails('file', activeSort);

    return (
        <th
            className={'sortable file ' + sortClass}
            onClick={() => onSort(newSort)}
        >
            File
            <span className="sorter" />
        </th>
    );
}