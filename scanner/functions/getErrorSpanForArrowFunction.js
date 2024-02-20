function getErrorSpanForArrowFunction(sourceFile, node) {
            const pos = skipTrivia(sourceFile.text, node.pos);
            if (node.body && node.body.kind === 238 /* Block */) {
                const { line: startLine } = getLineAndCharacterOfPosition(sourceFile, node.body.pos);
                const { line: endLine } = getLineAndCharacterOfPosition(sourceFile, node.body.end);
                if (startLine < endLine) {
                    return createTextSpan(pos, getEndLinePosition(startLine, sourceFile) - pos + 1);
                }
            }
            return createTextSpanFromBounds(pos, node.end);
        }