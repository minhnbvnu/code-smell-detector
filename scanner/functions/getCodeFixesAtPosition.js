function getCodeFixesAtPosition(fileName, start, end, errorCodes63, formatOptions, preferences = emptyOptions) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                const span = createTextSpanFromBounds(start, end);
                const formatContext = ts_formatting_exports.getFormatContext(formatOptions, host);
                return flatMap(deduplicate(errorCodes63, equateValues, compareValues), (errorCode) => {
                    cancellationToken.throwIfCancellationRequested();
                    return ts_codefix_exports.getFixes({ errorCode, sourceFile, span, program, host, cancellationToken, formatContext, preferences });
                });
            }