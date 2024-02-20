async function readAndEvaluateFiles (jsFiles, workers, recursing) {
    jsFiles = jsFiles.filter((jsFile) => (/\.js/u).test(jsFile));
    if (!recursing && fileIndex) { // Start at a particular file count
        const start = Number.parseInt(fileIndex);
        const end = (endFileCount ? (start + Number.parseInt(endFileCount)) : jsFiles.length);
        await readAndEvaluateFiles(
            jsFiles.slice(start, end),
            workers,
            true
        );
        return;
    }
    let initial;
    try {
        initial = await readFile(path.join('test-support', 'environment.js'), 'utf8');
    } catch (err) {
        console.error('Error 6', err);
        return;
    }

    // console.log(JSON.stringify(jsFiles)); // See what files we've got

    // Hard-coding problematic files for testing
    // jsFiles = ['idbcursor-continuePrimaryKey-exception-order.js'];
    // jsFiles = ['idlharness.any.js'];
    // jsFiles = ['transaction-lifetime-empty.js'];

    let ending;
    try {
        ending = await readFile(path.join('test-support', 'custom-reporter.js'), 'utf8');
    } catch (err) {
        console.error('Error 7', err);
        return;
    }
    await readAndEvaluate(jsFiles, initial, ending, workers);
}