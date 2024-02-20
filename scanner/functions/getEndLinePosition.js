function getEndLinePosition(line, sourceFile) {
            Debug.assert(line >= 0);
            const lineStarts = getLineStarts(sourceFile);
            const lineIndex = line;
            const sourceText = sourceFile.text;
            if (lineIndex + 1 === lineStarts.length) {
                return sourceText.length - 1;
            }
            else {
                const start = lineStarts[lineIndex];
                let pos = lineStarts[lineIndex + 1] - 1;
                Debug.assert(isLineBreak(sourceText.charCodeAt(pos)));
                while (start <= pos && isLineBreak(sourceText.charCodeAt(pos))) {
                    pos--;
                }
                return pos;
            }
        }