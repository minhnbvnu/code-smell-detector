function createHeaderCellItemTemplate(context) {
  const cellTag = context.tagFor(DataGridCell);
  return html`<${cellTag} cell-type="columnheader" grid-column="${(x, c) => c.index + 1}" :columnDefinition="${x => x}"></${cellTag}>`;
}