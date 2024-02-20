function SubHeadings({ sortKeyPrefix, onSort, activeSort }) {
    return (
        <>
            <SummaryTableHeaderCell
                name="%"
                onSort={onSort}
                sortKey={sortKeyPrefix + '.pct'}
                activeSort={activeSort}
            />
            <th className="headercell"></th>
            <SummaryTableHeaderCell
                name="Covered"
                onSort={onSort}
                sortKey={sortKeyPrefix + '.covered'}
                activeSort={activeSort}
            />
            <SummaryTableHeaderCell
                name="Missed"
                onSort={onSort}
                sortKey={sortKeyPrefix + '.missed'}
                activeSort={activeSort}
            />
            <SummaryTableHeaderCell
                name="Total"
                onSort={onSort}
                sortKey={sortKeyPrefix + '.total'}
                activeSort={activeSort}
            />
        </>
    );
}