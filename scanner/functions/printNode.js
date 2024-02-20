function printNode(hint, node, sourceFile) {
                const unescaped = printUnescapedNode(hint, node, sourceFile);
                return escapes ? ts_textChanges_exports.applyChanges(unescaped, escapes) : unescaped;
            }