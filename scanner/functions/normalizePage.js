function normalizePage(uri) {
    if (!uri) return null;
    var parts = url.parse(uri, true);

    return {
        pagetoken: parts.query.PageToken,
        page: Number(parts.query.Page)
    };
}