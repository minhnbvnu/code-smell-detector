function initRecord(record, key) {
    if (!record.hasOwnProperty(key)) {
        record[key] = [];
    }
}