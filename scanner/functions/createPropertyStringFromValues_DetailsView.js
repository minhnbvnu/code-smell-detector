function createPropertyStringFromValues_DetailsView(pageIndex, dataKeys) {
    var value = new Array(pageIndex, dataKeys);
    return value.join("|");
}