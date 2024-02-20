function getReferenceForShorthandProperty({ flags, valueDeclaration }, search, state) {
                        const shorthandValueSymbol = state.checker.getShorthandAssignmentValueSymbol(valueDeclaration);
                        const name = valueDeclaration && getNameOfDeclaration(valueDeclaration);
                        if (!(flags & 33554432 /* Transient */) && name && search.includes(shorthandValueSymbol)) {
                            addReference(name, shorthandValueSymbol, state);
                        }
                    }