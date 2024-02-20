function getFormattingEditsForDocument(fileName, options) {
                return ts_formatting_exports.formatDocument(syntaxTreeCache.getCurrentSourceFile(fileName), ts_formatting_exports.getFormatContext(toEditorSettings(options), host));
            }