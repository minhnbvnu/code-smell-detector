function emptyCoverage(filePath, reportLogic) {
    const cov = {
        path: filePath,
        statementMap: {},
        fnMap: {},
        branchMap: {},
        s: {},
        f: {},
        b: {}
    };
    if (reportLogic) cov.bT = {};
    return cov;
}