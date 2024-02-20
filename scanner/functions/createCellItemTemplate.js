function createCellItemTemplate(context) {
  const cellTag = context.tagFor(DataGridCell);
  return html`<${cellTag} cell-type="${x => x.isRowHeader ? "rowheader" : undefined}" grid-column="${(x, c) => c.index + 1}" :rowData="${(x, c) => c.parent.rowData}" :columnDefinition="${x => x}"></${cellTag}>`;
}