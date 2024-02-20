function classDeclarationExtendsNull(classDecl) {
                const classSymbol = getSymbolOfDeclaration(classDecl);
                const classInstanceType = getDeclaredTypeOfSymbol(classSymbol);
                const baseConstructorType = getBaseConstructorTypeOfClass(classInstanceType);
                return baseConstructorType === nullWideningType;
            }