function getFormattingEditsForRange(fileName, start, end, options) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                return ts_formatting_exports.formatSelection(start, end, sourceFile, ts_formatting_exports.getFormatContext(toEditorSettings(options), host));
            }