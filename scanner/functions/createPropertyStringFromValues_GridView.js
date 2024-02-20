function createPropertyStringFromValues_GridView(pageIndex, sortDirection, sortExpression, dataKeys) {
    var value = new Array(pageIndex, sortDirection, sortExpression, dataKeys);
    return value.join("|");
}