async function finishedCheck () {
            /**
             * @typedef {any} JSONValue
             */
            /**
             * @param {JSONValue} value
             * @param {null} [replacer]
             * @param {string|number|undefined} [space]
             * @returns {string}
             */
            function cleanJSONOutput (value, replacer, space) {
                return JSON.stringify(value, replacer, space).replaceAll('"', "'").replaceAll('\',\'', "', '");
            }
            if (ct < jsFiles.length) {
                // Todo: Have the test environment script itself report back time-outs and
                //    tweak per test? (but set vmTimeout longer in case needed or even
                //    remove if we control it on a per-test basis ourselves)
                // We chain requests to avoid tests having race condition, e.g.,
                //   potentially reusing database name, etc. if not handled already
                //   in the tests (more tests do pass with these timeouts);
                //   the timeout, however, does not even seem to be necessary.
                // setTimeout(() => {
                await readAndEvaluate(jsFiles, initial, ending, workers, ++item);
                // }, intervalSpacing);
                return;
            }

            // Ensure time for final clean-up (e.g., deleting databases) and
            //   logging before reporting results
            setTimeout(async () => {
                shimNS.files['Files with all tests passing'] = shimNS.files.Pass.filter((p) => {
                    return !shimNS.files.Fail.includes(p) &&
                        !shimNS.files.Timeout.includes(p) &&
                        !shimNS.files['Not Run'].includes(p);
                });

                const unknownFiles = [];
                const knownFiles = [
                    ...goodFiles, ...badFiles, ...notRunning,
                    ...timeout, ...excludedWorkers, ...excludedNormal
                ];

                console.log('\nTest files by status (may recur):');
                console.log(
                    // Object.entries(shimNS.files).reduce((_, [status, files]) => { // Sometimes failing in Node 6.9.2
                    Object.keys(shimNS.files).reduce((_, status) => {
                        const files = shimNS.files[status];
                        files.forEach((file) => {
                            if (!knownFiles.includes(file) && !unknownFiles.includes(file)) {
                                unknownFiles.push(file);
                            }
                        });
                        if (!files.length) {
                            return _ + '  ' + status + ': 0\n';
                        }
                        return _ + '  ' + status + ' (' + files.length +
                            '): [\n    ' + cleanJSONOutput(files).slice(1, -1) +
                            '\n  ]\n';
                    }, '\n')
                );

                const runFiles = Object.keys(shimNS.files).flatMap((status) => {
                    return shimNS.files[status];
                });

                const removeable = [];
                knownFiles.forEach((priorReportedFile) => {
                    if (!runFiles.includes(priorReportedFile)) {
                        removeable.push(priorReportedFile);
                    }
                });

                // Don't show for small executions
                if (shimNS.files['Files with all tests passing'].length > 1) {
                    console.log('\nFiles that can be removed from our listings', removeable, '\n');
                }

                console.log('  Number of files processed: ' + (ct - excludedCount));

                console.log('\nNumber of total tests by status:');
                shimNS.statuses['Total tests'] = Object.values(shimNS.statuses).reduce((ct, statusCt) => ct + statusCt);
                console.log(
                    cleanJSONOutput(shimNS.statuses, null, 2) + '\n'
                );

                console.log('Files run which were not in goodBadFiles list', unknownFiles.length, unknownFiles);

                console.log('Unexpectedly wholly passing files:');

                const unexpectedPasses = shimNS.files['Files with all tests passing'].filter((file) => {
                    return !goodFiles.includes(file);
                });
                if (unexpectedPasses.length) {
                    console.log(
                        '  ' + '(' + unexpectedPasses.length + '): [\n    ' + cleanJSONOutput(unexpectedPasses).slice(1, -1) + '\n  ]\n'
                    );
                } else {
                    console.log('(None)');
                }

                console.log('Unexpected failures:');
                const failedFiles = shimNS.files.Fail.filter(
                    (f) => ![...badFiles, ...excludedWorkers, ...excludedNormal].includes(f) &&
                    ![
                        '../non-indexedDB/interface-objects.js',
                        '../non-indexedDB/__event-interface.js',
                        '../non-indexedDB/exceptions.js'
                    ].includes(f) &&
                    (!workers || !['_service-worker-indexeddb.https.js'].includes(f))
                );
                if (failedFiles.length) {
                    console.log(
                        '  ' + '(' + failedFiles.length + '): [\n    ' + cleanJSONOutput(failedFiles).slice(1, -1) + '\n  ]\n'
                    );
                } else { console.log('(None)'); }

                if (shimNS.fileMap) {
                    console.log(
                        [...shimNS.fileMap].reduce(
                            (str, [fileName, [passing, total]]) => {
                                return str + fileName + ': ' + passing + '/' + total + '\n';
                            },
                            ''
                        )
                    );
                    shimNS.fileMap.clear(); // Release memory
                }
                if (excluded.length) {
                    console.log(
                        'Please note that the following tests ' + excluded.length +
                        ' are being deliberately excluded as we do not yet have the ' +
                        'built-in support for their features (e.g., shared and ' +
                        'service workers), and they are not currently allowing the ' +
                        'other tests to complete: ' + cleanJSONOutput(excluded)
                    );
                }
                if (jsonResults) {
                    const jsonOutputPath = path.join(
                        'test-support', 'results',
                        'file-w3c' +
                            // new Date().getTime() +
                            '.json'
                    );
                    try {
                        await writeFile(jsonOutputPath, JSON.stringify(
                            {
                                stats: {
                                    passes: shimNS.statuses.Pass,
                                    failures:
                                        shimNS.statuses.Fail +
                                        shimNS.statuses.Timeout +
                                        shimNS.statuses['Not Run']
                                }
                            }, null, 2
                        ));
                    } catch (err) {
                        console.error('Error1', err);
                        return;
                    }
                    console.log('Saved to ' + jsonOutputPath);
                } else if (shimNS.jsonOutput) {
                    const jsonOutputPath = path.join(
                        'test-support', 'json-output' +
                        // new Date().getTime() +
                        '.json'
                    );
                    try {
                        await writeFile(jsonOutputPath, JSON.stringify(shimNS.jsonOutput, null, 2));
                    } catch (err) {
                        console.error('Error 2', err);
                        return;
                    }
                    console.log('Saved to ' + jsonOutputPath);
                }
                exit();
            }, 1000);
        }