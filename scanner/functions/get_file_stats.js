async function get_file_stats(path) {
    return fetch(`/${DATABASE_NAME}/query/rankAuthorsByLinesChangedInPath?`
        + new URLSearchParams(path)
    )
}