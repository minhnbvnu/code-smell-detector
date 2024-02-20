function getCellPropertiesObject(rowIndex, dataModel) {
    return this.getCellOwnProperties(rowIndex, dataModel) || newCellPropertiesObject.call(this, rowIndex, dataModel);
}