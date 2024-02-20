function get_row_value(row, column) {
    let ids_map = ["asset_name","ioc_value","filename","id"];
    for (let id in ids_map) {
        if (row[ids_map[id]] !== undefined) {
            return row[ids_map[id]];
        }
    }
    return null;
}