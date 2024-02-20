function annotateStatements(fileCoverage, structuredText) {
    const statementStats = fileCoverage.s;
    const statementMeta = fileCoverage.statementMap;
    Object.entries(statementStats).forEach(([stName, count]) => {
        const meta = statementMeta[stName];
        const type = count > 0 ? 'yes' : 'no';
        const startCol = meta.start.column;
        let endCol = meta.end.column + 1;
        const startLine = meta.start.line;
        const endLine = meta.end.line;
        const openSpan =
            lt +
            'span class="' +
            (meta.skip ? 'cstat-skip' : 'cstat-no') +
            '"' +
            title('statement not covered') +
            gt;
        const closeSpan = lt + '/span' + gt;
        let text;

        if (type === 'no' && structuredText[startLine]) {
            if (endLine !== startLine) {
                endCol = structuredText[startLine].text.originalLength();
            }
            text = structuredText[startLine].text;
            text.wrap(
                startCol,
                openSpan,
                startCol < endCol ? endCol : text.originalLength(),
                closeSpan
            );
        }
    });
}