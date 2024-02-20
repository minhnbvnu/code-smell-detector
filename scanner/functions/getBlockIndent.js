function getBlockIndent(sourceFile, position, options) {
                        let current = position;
                        while (current > 0) {
                            const char = sourceFile.text.charCodeAt(current);
                            if (!isWhiteSpaceLike(char)) {
                                break;
                            }
                            current--;
                        }
                        const lineStart = getLineStartPositionForPosition(current, sourceFile);
                        return findFirstNonWhitespaceColumn(lineStart, current, sourceFile, options);
                    }