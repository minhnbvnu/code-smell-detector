function rangeIsOnOneLine(sourceFile, range) {
                        const rangeStart = skipTrivia(sourceFile.text, range.pos);
                        const startLine = sourceFile.getLineAndCharacterOfPosition(rangeStart).line;
                        const endLine = sourceFile.getLineAndCharacterOfPosition(range.end).line;
                        return startLine === endLine;
                    }