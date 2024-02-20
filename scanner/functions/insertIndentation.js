function insertIndentation(pos, indentation, lineAdded) {
                const indentationString = getIndentationString(indentation, options);
                if (lineAdded) {
                    recordReplace(pos, 0, indentationString);
                }
                else {
                    const tokenStart = sourceFile.getLineAndCharacterOfPosition(pos);
                    const startLinePosition = getStartPositionOfLine(tokenStart.line, sourceFile);
                    if (indentation !== characterToColumn(startLinePosition, tokenStart.character) || indentationIsDifferent(indentationString, startLinePosition)) {
                        recordReplace(startLinePosition, tokenStart.character, indentationString);
                    }
                }
            }