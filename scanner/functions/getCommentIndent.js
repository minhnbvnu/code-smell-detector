function getCommentIndent(sourceFile, position, options, enclosingCommentRange) {
                        const previousLine = getLineAndCharacterOfPosition(sourceFile, position).line - 1;
                        const commentStartLine = getLineAndCharacterOfPosition(sourceFile, enclosingCommentRange.pos).line;
                        Debug.assert(commentStartLine >= 0);
                        if (previousLine <= commentStartLine) {
                            return findFirstNonWhitespaceColumn(getStartPositionOfLine(commentStartLine, sourceFile), position, sourceFile, options);
                        }
                        const startPositionOfLine = getStartPositionOfLine(previousLine, sourceFile);
                        const { column, character } = findFirstNonWhitespaceCharacterAndColumn(startPositionOfLine, position, sourceFile, options);
                        if (column === 0) {
                            return column;
                        }
                        const firstNonWhitespaceCharacterCode = sourceFile.text.charCodeAt(startPositionOfLine + character);
                        return firstNonWhitespaceCharacterCode === 42 /* asterisk */ ? column - 1 : column;
                    }