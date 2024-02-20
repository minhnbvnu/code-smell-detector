async function loadLines({ baseUrl, linesFrom, authToken, pagesToLoad = 10, sort = 'ascending', maxLines }) {
    const page = Math.floor(linesFrom / maxLines);
    let morePages = false;
    let lines;

    try {
        lines = await fetchLog({ baseUrl, linesFrom, authToken, page, sort });
    } catch (err) {
        logger.error(err);
        throw new Error(err);
    }

    const linesCount = lines.length;
    const pagesToLoadUpdated = pagesToLoad - 1;
    const linesFromUpdated = sort === 'descending' ? linesFrom - linesCount : linesCount + linesFrom;
    // If we got lines AND there are more lines to load
    const descLoadNext = sort === 'descending' && linesCount > 0 && linesFrom - linesCount > 0;
    // If we got lines AND we reached the edge of a page
    const ascLoadNext = sort === 'ascending' && linesCount > 0 && (linesCount + linesFrom) % maxLines === 0;

    // Load from next log if there's still lines left
    if (ascLoadNext || descLoadNext) {
        if (pagesToLoadUpdated > 0) {
            const loadConfig = {
                baseUrl,
                linesFrom: linesFromUpdated,
                authToken,
                pagesToLoad: pagesToLoadUpdated,
                sort,
                maxLines
            };

            return loadLines(loadConfig).then(([nextLines, pageLimit]) => {
                if (sort === 'descending') {
                    return [nextLines.concat(lines), pageLimit];
                }

                return [lines.concat(nextLines), pageLimit];
            });
        }
        // Otherwise exit early and flag that there may be more pages
        morePages = true;
    }

    return [lines, morePages];
}