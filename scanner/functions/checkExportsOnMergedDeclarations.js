function checkExportsOnMergedDeclarations(node) {
                addLazyDiagnostic(() => checkExportsOnMergedDeclarationsWorker(node));
            }