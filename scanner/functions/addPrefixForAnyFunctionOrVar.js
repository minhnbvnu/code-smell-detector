function addPrefixForAnyFunctionOrVar(symbol2, symbolKind2) {
                prefixNextMeaning();
                if (symbolKind2) {
                    pushSymbolKind(symbolKind2);
                    if (symbol2 && !some(symbol2.declarations, (d) => isArrowFunction(d) || (isFunctionExpression(d) || isClassExpression(d)) && !d.name)) {
                        displayParts.push(spacePart());
                        addFullSymbolName(symbol2);
                    }
                }
            }