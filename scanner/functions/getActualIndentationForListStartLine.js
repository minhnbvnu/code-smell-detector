function getActualIndentationForListStartLine(list, sourceFile, options) {
                        if (!list) {
                            return -1 /* Unknown */;
                        }
                        return findColumnForFirstNonWhitespaceCharacterInLine(sourceFile.getLineAndCharacterOfPosition(list.pos), sourceFile, options);
                    }