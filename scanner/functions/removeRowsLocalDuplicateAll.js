function removeRowsLocalDuplicateAll(table) {
    var removedRows = removeRowsWithClass(table, 'htLDuplicate');
    alert("Removed " + removedRows + " locally duplicated rows");
}