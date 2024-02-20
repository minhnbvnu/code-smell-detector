function findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter, sourceFile, options) {
                        const lineStart = sourceFile.getPositionOfLineAndCharacter(lineAndCharacter.line, 0);
                        return findFirstNonWhitespaceColumn(lineStart, lineStart + lineAndCharacter.character, sourceFile, options);
                    }