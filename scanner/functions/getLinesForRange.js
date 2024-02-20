function getLinesForRange(sourceFile, textRange) {
                return {
                    lineStarts: sourceFile.getLineStarts(),
                    firstLine: sourceFile.getLineAndCharacterOfPosition(textRange.pos).line,
                    lastLine: sourceFile.getLineAndCharacterOfPosition(textRange.end).line
                };
            }