function createRowItemTemplate(context) {
  const rowTag = context.tagFor(DataGridRow);
  return html`<${rowTag} :rowData="${x => x}" :cellItemTemplate="${(x, c) => c.parent.cellItemTemplate}" :headerCellItemTemplate="${(x, c) => c.parent.headerCellItemTemplate}"></${rowTag}>`;
}