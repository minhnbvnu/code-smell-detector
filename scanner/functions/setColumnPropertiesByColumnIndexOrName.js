function setColumnPropertiesByColumnIndexOrName(columnsHash) { // to be called with grid.properties as context
    this.grid.behavior.addAllColumnProperties(columnsHash, this.settingState);
}