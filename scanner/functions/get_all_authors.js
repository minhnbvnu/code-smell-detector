async function get_all_authors() {
    return fetch(`/${DATABASE_NAME}/query/rankAuthorsByLinesChanged`)
}