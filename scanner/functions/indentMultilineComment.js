function indentMultilineComment(commentRange, indentation, firstLineIsIndented, indentFinalLine = true) {
                let startLine = sourceFile.getLineAndCharacterOfPosition(commentRange.pos).line;
                const endLine = sourceFile.getLineAndCharacterOfPosition(commentRange.end).line;
                if (startLine === endLine) {
                    if (!firstLineIsIndented) {
                        insertIndentation(commentRange.pos, indentation, 
                        /*lineAdded*/
                        false);
                    }
                    return;
                }
                const parts = [];
                let startPos = commentRange.pos;
                for (let line = startLine; line < endLine; line++) {
                    const endOfLine = getEndLinePosition(line, sourceFile);
                    parts.push({ pos: startPos, end: endOfLine });
                    startPos = getStartPositionOfLine(line + 1, sourceFile);
                }
                if (indentFinalLine) {
                    parts.push({ pos: startPos, end: commentRange.end });
                }
                if (parts.length === 0)
                    return;
                const startLinePos = getStartPositionOfLine(startLine, sourceFile);
                const nonWhitespaceColumnInFirstPart = SmartIndenter.findFirstNonWhitespaceCharacterAndColumn(startLinePos, parts[0].pos, sourceFile, options);
                let startIndex = 0;
                if (firstLineIsIndented) {
                    startIndex = 1;
                    startLine++;
                }
                const delta2 = indentation - nonWhitespaceColumnInFirstPart.column;
                for (let i = startIndex; i < parts.length; i++, startLine++) {
                    const startLinePos2 = getStartPositionOfLine(startLine, sourceFile);
                    const nonWhitespaceCharacterAndColumn = i === 0 ? nonWhitespaceColumnInFirstPart : SmartIndenter.findFirstNonWhitespaceCharacterAndColumn(parts[i].pos, parts[i].end, sourceFile, options);
                    const newIndentation = nonWhitespaceCharacterAndColumn.column + delta2;
                    if (newIndentation > 0) {
                        const indentationString = getIndentationString(newIndentation, options);
                        recordReplace(startLinePos2, nonWhitespaceCharacterAndColumn.character, indentationString);
                    }
                    else {
                        recordDelete(startLinePos2, nonWhitespaceCharacterAndColumn.character);
                    }
                }
            }