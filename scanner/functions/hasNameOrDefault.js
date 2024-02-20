function hasNameOrDefault(functionOrClassDeclaration) {
            if (!functionOrClassDeclaration.name) {
                const defaultKeyword = findModifier(functionOrClassDeclaration, 88 /* DefaultKeyword */);
                return !!defaultKeyword;
            }
            return true;
        }