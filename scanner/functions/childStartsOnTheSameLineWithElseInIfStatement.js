function childStartsOnTheSameLineWithElseInIfStatement(parent2, child, childStartLine, sourceFile) {
                        if (parent2.kind === 242 /* IfStatement */ && parent2.elseStatement === child) {
                            const elseKeyword = findChildOfKind(parent2, 91 /* ElseKeyword */, sourceFile);
                            Debug.assert(elseKeyword !== void 0);
                            const elseKeywordStartLine = getStartLineAndCharacterForNode(elseKeyword, sourceFile).line;
                            return elseKeywordStartLine === childStartLine;
                        }
                        return false;
                    }