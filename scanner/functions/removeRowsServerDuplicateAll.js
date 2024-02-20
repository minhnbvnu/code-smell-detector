function removeRowsServerDuplicateAll(table) {
    var removedRows = removeRowsWithClass(table, 'htDuplicate');
    alert("Removed " + removedRows + " duplicated rows");
}