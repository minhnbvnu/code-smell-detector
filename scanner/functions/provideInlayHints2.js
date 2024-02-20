function provideInlayHints2(fileName, span, preferences = emptyOptions) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                return ts_InlayHints_exports.provideInlayHints(getInlayHintsContext(sourceFile, span, preferences));
            }