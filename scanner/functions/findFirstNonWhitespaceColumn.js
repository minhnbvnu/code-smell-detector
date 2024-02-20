function findFirstNonWhitespaceColumn(startPos, endPos, sourceFile, options) {
                        return findFirstNonWhitespaceCharacterAndColumn(startPos, endPos, sourceFile, options).column;
                    }