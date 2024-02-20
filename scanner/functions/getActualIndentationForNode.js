function getActualIndentationForNode(current, parent2, currentLineAndChar, parentAndChildShareLine, sourceFile, options) {
                        const useActualIndentation = (isDeclaration(current) || isStatementButNotDeclaration(current)) && (parent2.kind === 308 /* SourceFile */ || !parentAndChildShareLine);
                        if (!useActualIndentation) {
                            return -1 /* Unknown */;
                        }
                        return findColumnForFirstNonWhitespaceCharacterInLine(currentLineAndChar, sourceFile, options);
                    }