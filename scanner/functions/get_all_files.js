async function get_all_files() {
    return fetch(`/${DATABASE_NAME}/query/rankFilesByLinesChanged`)
}