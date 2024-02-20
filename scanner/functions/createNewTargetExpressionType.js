function createNewTargetExpressionType(targetType) {
                const symbol = createSymbol(0 /* None */, "NewTargetExpression");
                const targetPropertySymbol = createSymbol(4 /* Property */, "target", 8 /* Readonly */);
                targetPropertySymbol.parent = symbol;
                targetPropertySymbol.links.type = targetType;
                const members = createSymbolTable([targetPropertySymbol]);
                symbol.members = members;
                return createAnonymousType(symbol, members, emptyArray, emptyArray, emptyArray);
            }