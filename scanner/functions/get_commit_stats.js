async function get_commit_stats(author_email) {
    return fetch(`/${DATABASE_NAME}/query/filesChangeMostByCommit?`
        + new URLSearchParams(author_email)
    )
}