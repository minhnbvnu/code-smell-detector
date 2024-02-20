function moveChildrenLabels(columns, { sourceLabel, targetLabel }) {
  const sourceIndex = findIndex(
    columns,
    column => (
      findIndex(
        column.children,
        { header: { label: sourceLabel } }
      ) >= 0
    )
  );

  if (sourceIndex < 0) {
    return null;
  }

  const targetIndex = findIndex(
    columns,
    column => (
      findIndex(
        column.children,
        { header: { label: targetLabel } }
      ) >= 0
    )
  );

  if (targetIndex < 0) {
    return null;
  }

  // Allow drag and drop only within the same column
  if (sourceIndex !== targetIndex) {
    return null;
  }

  const movedChildren = moveLabels(columns[sourceIndex].children, {
    sourceLabel, targetLabel
  });

  if (!movedChildren) {
    return null;
  }

  return {
    target: sourceIndex,
    columns: movedChildren.columns
  };
}