function getOutliningSpans(fileName) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                return ts_OutliningElementsCollector_exports.collectElements(sourceFile, cancellationToken);
            }