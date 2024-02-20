function printSnippetList(format, list, sourceFile) {
                const unescaped = printUnescapedSnippetList(format, list, sourceFile);
                return escapes ? ts_textChanges_exports.applyChanges(unescaped, escapes) : unescaped;
            }