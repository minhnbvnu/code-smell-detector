function annotateLines(fileCoverage, structuredText) {
    const lineStats = fileCoverage.getLineCoverage();
    if (!lineStats) {
        return;
    }
    Object.entries(lineStats).forEach(([lineNumber, count]) => {
        if (structuredText[lineNumber]) {
            structuredText[lineNumber].covered = count > 0 ? 'yes' : 'no';
            structuredText[lineNumber].hits = count;
        }
    });
}