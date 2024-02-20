async function get_author_stats(author_email) {
    return fetch(`/${DATABASE_NAME}/query/filesChangeMostByAuthor?`
        + new URLSearchParams(author_email)
    )
}