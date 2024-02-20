function saveToFile(record, prefix) {
    for (let key in record) {
        var path = prefix + key + ".txt";
        files.create(path);
        files.write(path, record[key].join("\r\n"));
    }
}