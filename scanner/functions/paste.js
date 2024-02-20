function paste(event) {
  if (Jupyter.notebook.mode !== 'command') {
    return;
  }
  console.log(i18n.msg.sprintf(i18n.msg._('Clipboard types: %s'),event.clipboardData.types));
  cells = load_json(event.clipboardData);
  // console.log(cells);
  // Does this JSON look like cells?
  if (Array.isArray(cells) && (cells.length > 0) &&
      cells[0].cell_type && cells[0].source) {
    var first_inserted = null;
    for (var i=0; i < cells.length; i++) {
        var cell_data = cells[i];
        var new_cell = Jupyter.notebook.insert_cell_above(cell_data.cell_type);
        new_cell.fromJSON(cell_data);
        if (first_inserted === null) {
            first_inserted = new_cell;
        }
    }
    first_inserted.focus_cell();
  }
  event.preventDefault();
}