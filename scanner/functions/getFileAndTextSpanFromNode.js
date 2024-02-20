function getFileAndTextSpanFromNode(node) {
            const sourceFile = node.getSourceFile();
            return {
                sourceFile,
                textSpan: getTextSpan(isComputedPropertyName(node) ? node.expression : node, sourceFile)
            };
        }