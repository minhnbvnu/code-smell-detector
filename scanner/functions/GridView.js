function GridView() {
    this.pageIndex = null;
    this.sortExpression = null;
    this.sortDirection = null;
    this.dataKeys = null;
    this.createPropertyString = GridView_createPropertyString;
    this.setStateField = GridView_setStateValue;
    this.getHiddenFieldContents = GridView_getHiddenFieldContents;
    this.stateField = null;
    this.panelElement = null;
    this.callback = null;
}