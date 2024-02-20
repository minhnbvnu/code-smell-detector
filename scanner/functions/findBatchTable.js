function findBatchTable(object) {
    if (object.batchTable) {
        return object.batchTable;
    }
    if (object.parent) {
        return findBatchTable(object.parent);
    }
    return null;
}