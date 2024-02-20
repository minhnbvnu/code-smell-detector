function annotateBranches(fileCoverage, structuredText) {
    const branchStats = fileCoverage.b;
    const branchMeta = fileCoverage.branchMap;
    if (!branchStats) {
        return;
    }

    Object.entries(branchStats).forEach(([branchName, branchArray]) => {
        const sumCount = branchArray.reduce((p, n) => p + n, 0);
        const metaArray = branchMeta[branchName].locations;
        let i;
        let count;
        let meta;
        let startCol;
        let endCol;
        let startLine;
        let endLine;
        let openSpan;
        let closeSpan;
        let text;

        // only highlight if partial branches are missing or if there is a
        // single uncovered branch.
        if (sumCount > 0 || (sumCount === 0 && branchArray.length === 1)) {
            // Need to recover the metaArray placeholder item to count an implicit else
            if (
                // Check if the branch is a conditional if branch.
                branchMeta[branchName].type === 'if' &&
                // Check if the branch has an implicit else.
                branchArray.length === 2 &&
                // Check if the implicit else branch is unaccounted for.
                metaArray.length === 1 &&
                // Check if the implicit else branch is uncovered.
                branchArray[1] === 0
            ) {
                metaArray[1] = {
                    start: {},
                    end: {}
                };
            }

            for (
                i = 0;
                i < branchArray.length && i < metaArray.length;
                i += 1
            ) {
                count = branchArray[i];
                meta = metaArray[i];
                startCol = meta.start.column;
                endCol = meta.end.column + 1;
                startLine = meta.start.line;
                endLine = meta.end.line;
                openSpan =
                    lt +
                    'span class="branch-' +
                    i +
                    ' ' +
                    (meta.skip ? 'cbranch-skip' : 'cbranch-no') +
                    '"' +
                    title('branch not covered') +
                    gt;
                closeSpan = lt + '/span' + gt;

                // If the branch is an implicit else from an if statement,
                // then the coverage report won't show a statistic.
                // Therefore, the previous branch will be used to report that
                // there is no coverage on that implicit branch.
                if (
                    count === 0 &&
                    startLine === undefined &&
                    branchMeta[branchName].type === 'if'
                ) {
                    const prevMeta = metaArray[i - 1];
                    startCol = prevMeta.start.column;
                    endCol = prevMeta.end.column + 1;
                    startLine = prevMeta.start.line;
                    endLine = prevMeta.end.line;
                }

                if (count === 0 && structuredText[startLine]) {
                    //skip branches taken
                    if (endLine !== startLine) {
                        endCol = structuredText[
                            startLine
                        ].text.originalLength();
                    }
                    text = structuredText[startLine].text;
                    if (branchMeta[branchName].type === 'if') {
                        // 'if' is a special case
                        // since the else branch might not be visible, being nonexistent
                        text.insertAt(
                            startCol,
                            lt +
                                'span class="' +
                                (meta.skip
                                    ? 'skip-if-branch'
                                    : 'missing-if-branch') +
                                '"' +
                                title(
                                    (i === 0 ? 'if' : 'else') +
                                        ' path not taken'
                                ) +
                                gt +
                                (i === 0 ? 'I' : 'E') +
                                lt +
                                '/span' +
                                gt,
                            true,
                            false
                        );
                    } else {
                        text.wrap(
                            startCol,
                            openSpan,
                            startCol < endCol ? endCol : text.originalLength(),
                            closeSpan
                        );
                    }
                }
            }
        }
    });
}