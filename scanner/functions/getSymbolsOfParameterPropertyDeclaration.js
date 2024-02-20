function getSymbolsOfParameterPropertyDeclaration(parameter, parameterName) {
                const constructorDeclaration = parameter.parent;
                const classDeclaration = parameter.parent.parent;
                const parameterSymbol = getSymbol2(constructorDeclaration.locals, parameterName, 111551 /* Value */);
                const propertySymbol = getSymbol2(getMembersOfSymbol(classDeclaration.symbol), parameterName, 111551 /* Value */);
                if (parameterSymbol && propertySymbol) {
                    return [parameterSymbol, propertySymbol];
                }
                return Debug.fail("There should exist two symbols, one as property declaration and one as parameter declaration");
            }