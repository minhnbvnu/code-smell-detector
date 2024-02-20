function annotateSourceCode(fileCoverage, sourceStore) {
    let codeArray;
    let lineCoverageArray;
    try {
        const sourceText = sourceStore.getSource(fileCoverage.path);
        const code = sourceText.split(/(?:\r?\n)|\r/);
        let count = 0;
        const structured = code.map(str => {
            count += 1;
            return {
                line: count,
                covered: 'neutral',
                hits: 0,
                text: new InsertionText(str, true)
            };
        });
        structured.unshift({
            line: 0,
            covered: null,
            text: new InsertionText('')
        });
        annotateLines(fileCoverage, structured);
        //note: order is important, since statements typically result in spanning the whole line and doing branches late
        //causes mismatched tags
        annotateBranches(fileCoverage, structured);
        annotateFunctions(fileCoverage, structured);
        annotateStatements(fileCoverage, structured);
        structured.shift();

        codeArray = structured.map(
            item => customEscape(item.text.toString()) || '&nbsp;'
        );

        lineCoverageArray = structured.map(item => ({
            covered: item.covered,
            hits: item.hits > 0 ? item.hits + 'x' : '&nbsp;'
        }));

        return {
            annotatedCode: codeArray,
            lineCoverage: lineCoverageArray,
            maxLines: structured.length
        };
    } catch (ex) {
        codeArray = [ex.message];
        lineCoverageArray = [{ covered: 'no', hits: 0 }];
        String(ex.stack || '')
            .split(/\r?\n/)
            .forEach(line => {
                codeArray.push(line);
                lineCoverageArray.push({ covered: 'no', hits: 0 });
            });
        return {
            annotatedCode: codeArray,
            lineCoverage: lineCoverageArray,
            maxLines: codeArray.length
        };
    }
}