function trimTrailingWitespacesForPositions(startPos, endPos, previousRange2) {
                const startLine = sourceFile.getLineAndCharacterOfPosition(startPos).line;
                const endLine = sourceFile.getLineAndCharacterOfPosition(endPos).line;
                trimTrailingWhitespacesForLines(startLine, endLine + 1, previousRange2);
            }