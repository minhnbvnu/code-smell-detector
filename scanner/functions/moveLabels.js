function moveLabels(columns, { sourceLabel, targetLabel }) {
  if (!columns) {
    throw new Error('dnd.moveLabels - Missing columns!');
  }

  const sourceIndex = findIndex(
    columns,
    { header: { label: sourceLabel } }
  );

  if (sourceIndex < 0) {
    return null;
  }

  const targetIndex = findIndex(
    columns,
    { header: { label: targetLabel } }
  );

  if (targetIndex < 0) {
    return null;
  }

  const movedColumns = move(columns, sourceIndex, targetIndex);

  return {
    source: movedColumns[sourceIndex],
    target: movedColumns[targetIndex],
    columns: movedColumns
  };
}