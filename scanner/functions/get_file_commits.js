async function get_file_commits(path) {
    return fetch(`/${DATABASE_NAME}/query/rankCommitsByLinesChangedForFile?`
        + new URLSearchParams(path)
    )
}