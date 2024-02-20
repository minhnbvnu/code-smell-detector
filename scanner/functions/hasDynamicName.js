function hasDynamicName(declaration) {
            const name = getNameOfDeclaration(declaration);
            return !!name && isDynamicName(name);
        }