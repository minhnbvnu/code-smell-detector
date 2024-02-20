function createCellEditor(name, props) {
    var CellEditor = cellEditors.get(name);
    if (CellEditor) {
        return new CellEditor(this, props);
    }
}