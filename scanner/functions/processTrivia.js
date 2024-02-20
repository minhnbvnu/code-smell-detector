function processTrivia(trivia, parent2, contextNode, dynamicIndentation) {
                for (const triviaItem of trivia) {
                    if (isComment(triviaItem.kind) && rangeContainsRange(originalRange, triviaItem)) {
                        const triviaItemStart = sourceFile.getLineAndCharacterOfPosition(triviaItem.pos);
                        processRange(triviaItem, triviaItemStart, parent2, contextNode, dynamicIndentation);
                    }
                }
            }