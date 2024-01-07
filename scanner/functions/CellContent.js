function CellContent(props) {
  const {
    columnIndex,
    rowIndex,
    attributesInSortedOrder,
    completedHashes,
    toggleAttribute,
    table,
  } = props;
  const attribute = attributesInSortedOrder[rowIndex - 1];
  const type = types[columnIndex - 1];

  if (columnIndex === 0) {
    if (rowIndex === 0) {
      return null;
    }
    const row = table.get(attribute);
    const rowPatternHash = row.rowPatternHash;
    return (
      <RowHeader
        checked={completedHashes.has(rowPatternHash)}
        onChange={() => toggleAttribute(rowPatternHash)}>
        {row.hasSameBehaviorForAll ? (
          attribute.name
        ) : (
          <b css={{color: 'purple'}}>{attribute.name}</b>
        )}
      </RowHeader>
    );
  }

  if (rowIndex === 0) {
    return <ColumnHeader>{type.name}</ColumnHeader>;
  }

  const row = table.get(attribute);
  const result = row.results.get(type.name);

  return <Result {...result} />;
}