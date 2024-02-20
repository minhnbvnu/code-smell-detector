function nodeMissing(node) {
    if (node.isSummary()) {
        return '';
    }

    const metrics = node.getCoverageSummary();
    const isEmpty = metrics.isEmpty();
    const lines = isEmpty ? 0 : metrics.lines.pct;

    let coveredLines;

    const fileCoverage = node.getFileCoverage();
    if (lines === 100) {
        const branches = fileCoverage.getBranchCoverageByLine();
        coveredLines = Object.entries(branches).map(([key, { coverage }]) => [
            key,
            coverage === 100
        ]);
    } else {
        coveredLines = Object.entries(fileCoverage.getLineCoverage());
    }

    let newRange = true;
    const ranges = coveredLines
        .reduce((acum, [line, hit]) => {
            if (hit) newRange = true;
            else {
                line = parseInt(line);
                if (newRange) {
                    acum.push([line]);
                    newRange = false;
                } else acum[acum.length - 1][1] = line;
            }

            return acum;
        }, [])
        .map(range => {
            const { length } = range;

            if (length === 1) return range[0];

            return `${range[0]}-${range[1]}`;
        });

    return [].concat(...ranges).join(',');
}