function getDeclarationIdentifier(node) {
            const name = getNameOfDeclaration(node);
            return name && isIdentifier(name) ? name : void 0;
        }