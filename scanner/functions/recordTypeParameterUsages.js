function recordTypeParameterUsages(type) {
                const symbolWalker = checker.getSymbolWalker(() => (cancellationToken.throwIfCancellationRequested(), true));
                const { visitedTypes } = symbolWalker.walkType(type);
                for (const visitedType of visitedTypes) {
                    if (visitedType.isTypeParameter()) {
                        allTypeParameterUsages.set(visitedType.id.toString(), visitedType);
                    }
                }
            }