async function get_all_commits() {
    return fetch(`/${DATABASE_NAME}/query/rankCommitsByLinesChanged`)
}