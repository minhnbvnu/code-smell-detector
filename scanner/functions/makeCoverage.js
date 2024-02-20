function makeCoverage(filePath, numStatements, numCovered) {
    const fc = {
        path: filePath,
        statementMap: {},
        fnMap: {},
        branchMap: {},
        s: {},
        f: {},
        b: {}
    };
    let i;
    let index;

    for (i = 0; i < numStatements; i += 1) {
        index = i + 1;
        fc.statementMap[index] = {
            start: { line: i + 1, column: 0 },
            end: { line: i + 1, column: 100 }
        };
        if (i < numCovered) {
            fc.s[index] = 1;
        }
    }
    return fc;
}