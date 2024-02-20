function deriveActualIndentationFromList(list, index, sourceFile, options) {
                        Debug.assert(index >= 0 && index < list.length);
                        const node = list[index];
                        let lineAndCharacter = getStartLineAndCharacterForNode(node, sourceFile);
                        for (let i = index - 1; i >= 0; i--) {
                            if (list[i].kind === 27 /* CommaToken */) {
                                continue;
                            }
                            const prevEndLine = sourceFile.getLineAndCharacterOfPosition(list[i].end).line;
                            if (prevEndLine !== lineAndCharacter.line) {
                                return findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter, sourceFile, options);
                            }
                            lineAndCharacter = getStartLineAndCharacterForNode(list[i], sourceFile);
                        }
                        return -1 /* Unknown */;
                    }