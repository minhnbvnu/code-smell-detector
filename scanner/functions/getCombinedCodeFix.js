function getCombinedCodeFix(scope, fixId51, formatOptions, preferences = emptyOptions) {
                synchronizeHostData();
                Debug.assert(scope.type === "file");
                const sourceFile = getValidSourceFile(scope.fileName);
                const formatContext = ts_formatting_exports.getFormatContext(formatOptions, host);
                return ts_codefix_exports.getAllFixes({ fixId: fixId51, sourceFile, program, host, cancellationToken, formatContext, preferences });
            }