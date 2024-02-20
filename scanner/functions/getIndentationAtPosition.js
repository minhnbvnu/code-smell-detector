function getIndentationAtPosition(fileName, position, editorOptions) {
                let start = timestamp();
                const settings = toEditorSettings(editorOptions);
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                log("getIndentationAtPosition: getCurrentSourceFile: " + (timestamp() - start));
                start = timestamp();
                const result = ts_formatting_exports.SmartIndenter.getIndentation(position, sourceFile, settings);
                log("getIndentationAtPosition: computeIndentation  : " + (timestamp() - start));
                return result;
            }