function indentTriviaItems(trivia, commentIndentation, indentNextTokenOrTrivia, indentSingleLine) {
                for (const triviaItem of trivia) {
                    const triviaInRange = rangeContainsRange(originalRange, triviaItem);
                    switch (triviaItem.kind) {
                        case 3 /* MultiLineCommentTrivia */:
                            if (triviaInRange) {
                                indentMultilineComment(triviaItem, commentIndentation, 
                                /*firstLineIsIndented*/
                                !indentNextTokenOrTrivia);
                            }
                            indentNextTokenOrTrivia = false;
                            break;
                        case 2 /* SingleLineCommentTrivia */:
                            if (indentNextTokenOrTrivia && triviaInRange) {
                                indentSingleLine(triviaItem);
                            }
                            indentNextTokenOrTrivia = false;
                            break;
                        case 4 /* NewLineTrivia */:
                            indentNextTokenOrTrivia = true;
                            break;
                    }
                }
                return indentNextTokenOrTrivia;
            }