async function getMaxLines({ baseUrl, authToken }) {
    let linesInFirstPage;

    // check lines per file by looking at the first file
    try {
        linesInFirstPage = await fetchLog({
            baseUrl,
            authToken,
            sort: 'ascending',
            linesFrom: 0,
            page: 0
        });
    } catch (err) {
        logger.error(err);
        throw new Error(err);
    }

    return linesInFirstPage.length > MAX_LINES_SMALL ? MAX_LINES_BIG : MAX_LINES_SMALL;
}