function hasOwnConstructor(classDeclaration) {
                        return !!getClassConstructorSymbol(classDeclaration.symbol);
                    }