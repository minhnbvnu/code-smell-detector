function get_row_id(row) {
    let ids_map = ["ioc_id","asset_id","task_id","id"];
    for (let id in ids_map) {
        if (row[ids_map[id]] !== undefined) {
            return row[ids_map[id]];
        }
    }
    return null;
}