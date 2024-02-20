function createTypeAliasFromInterface(declaration, type) {
            return factory.createTypeAliasDeclaration(declaration.modifiers, declaration.name, declaration.typeParameters, type);
        }