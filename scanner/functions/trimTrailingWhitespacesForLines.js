function trimTrailingWhitespacesForLines(line1, line2, range) {
                for (let line = line1; line < line2; line++) {
                    const lineStartPosition = getStartPositionOfLine(line, sourceFile);
                    const lineEndPosition = getEndLinePosition(line, sourceFile);
                    if (range && (isComment(range.kind) || isStringOrRegularExpressionOrTemplateLiteral(range.kind)) && range.pos <= lineEndPosition && range.end > lineEndPosition) {
                        continue;
                    }
                    const whitespaceStart = getTrailingWhitespaceStartPosition(lineStartPosition, lineEndPosition);
                    if (whitespaceStart !== -1) {
                        Debug.assert(whitespaceStart === lineStartPosition || !isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(whitespaceStart - 1)));
                        recordDelete(whitespaceStart, lineEndPosition + 1 - whitespaceStart);
                    }
                }
            }