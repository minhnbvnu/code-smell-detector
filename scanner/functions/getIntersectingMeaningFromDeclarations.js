function getIntersectingMeaningFromDeclarations(node, symbol) {
                        let meaning = getMeaningFromLocation(node);
                        const { declarations } = symbol;
                        if (declarations) {
                            let lastIterationMeaning;
                            do {
                                lastIterationMeaning = meaning;
                                for (const declaration of declarations) {
                                    const declarationMeaning = getMeaningFromDeclaration(declaration);
                                    if (declarationMeaning & meaning) {
                                        meaning |= declarationMeaning;
                                    }
                                }
                            } while (meaning !== lastIterationMeaning);
                        }
                        return meaning;
                    }