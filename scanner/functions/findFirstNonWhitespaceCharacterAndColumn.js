function findFirstNonWhitespaceCharacterAndColumn(startPos, endPos, sourceFile, options) {
                        let character = 0;
                        let column = 0;
                        for (let pos = startPos; pos < endPos; pos++) {
                            const ch = sourceFile.text.charCodeAt(pos);
                            if (!isWhiteSpaceSingleLine(ch)) {
                                break;
                            }
                            if (ch === 9 /* tab */) {
                                column += options.tabSize + column % options.tabSize;
                            }
                            else {
                                column++;
                            }
                            character++;
                        }
                        return { column, character };
                    }