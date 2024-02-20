function getFormattingEditsAfterKeystroke(fileName, position, key, options) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const formatContext = ts_formatting_exports.getFormatContext(toEditorSettings(options), host);
                if (!isInComment(sourceFile, position)) {
                    switch (key) {
                        case "{":
                            return ts_formatting_exports.formatOnOpeningCurly(position, sourceFile, formatContext);
                        case "}":
                            return ts_formatting_exports.formatOnClosingCurly(position, sourceFile, formatContext);
                        case ";":
                            return ts_formatting_exports.formatOnSemicolon(position, sourceFile, formatContext);
                        case "\n":
                            return ts_formatting_exports.formatOnEnter(position, sourceFile, formatContext);
                    }
                }
                return [];
            }