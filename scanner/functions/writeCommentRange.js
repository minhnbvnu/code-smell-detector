function writeCommentRange(text, lineMap, writer, commentPos, commentEnd, newLine) {
            if (text.charCodeAt(commentPos + 1) === 42 /* asterisk */) {
                const firstCommentLineAndCharacter = computeLineAndCharacterOfPosition(lineMap, commentPos);
                const lineCount = lineMap.length;
                let firstCommentLineIndent;
                for (let pos = commentPos, currentLine = firstCommentLineAndCharacter.line; pos < commentEnd; currentLine++) {
                    const nextLineStart = currentLine + 1 === lineCount ? text.length + 1 : lineMap[currentLine + 1];
                    if (pos !== commentPos) {
                        if (firstCommentLineIndent === void 0) {
                            firstCommentLineIndent = calculateIndent(text, lineMap[firstCommentLineAndCharacter.line], commentPos);
                        }
                        const currentWriterIndentSpacing = writer.getIndent() * getIndentSize();
                        const spacesToEmit = currentWriterIndentSpacing - firstCommentLineIndent + calculateIndent(text, pos, nextLineStart);
                        if (spacesToEmit > 0) {
                            let numberOfSingleSpacesToEmit = spacesToEmit % getIndentSize();
                            const indentSizeSpaceString = getIndentString((spacesToEmit - numberOfSingleSpacesToEmit) / getIndentSize());
                            writer.rawWrite(indentSizeSpaceString);
                            while (numberOfSingleSpacesToEmit) {
                                writer.rawWrite(" ");
                                numberOfSingleSpacesToEmit--;
                            }
                        }
                        else {
                            writer.rawWrite("");
                        }
                    }
                    writeTrimmedCurrentLine(text, commentEnd, writer, newLine, pos, nextLineStart);
                    pos = nextLineStart;
                }
            }
            else {
                writer.writeComment(text.substring(commentPos, commentEnd));
            }
        }