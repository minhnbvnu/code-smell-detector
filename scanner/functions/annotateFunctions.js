function annotateFunctions(fileCoverage, structuredText) {
    const fnStats = fileCoverage.f;
    const fnMeta = fileCoverage.fnMap;
    if (!fnStats) {
        return;
    }
    Object.entries(fnStats).forEach(([fName, count]) => {
        const meta = fnMeta[fName];
        const type = count > 0 ? 'yes' : 'no';
        // Some versions of the instrumenter in the wild populate 'func'
        // but not 'decl':
        const decl = meta.decl || meta.loc;
        const startCol = decl.start.column;
        let endCol = decl.end.column + 1;
        const startLine = decl.start.line;
        const endLine = decl.end.line;
        const openSpan =
            lt +
            'span class="' +
            (meta.skip ? 'fstat-skip' : 'fstat-no') +
            '"' +
            title('function not covered') +
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