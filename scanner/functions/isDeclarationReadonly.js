function isDeclarationReadonly(declaration) {
            return !!(getCombinedModifierFlags(declaration) & 64 /* Readonly */ && !isParameterPropertyDeclaration(declaration, declaration.parent));
        }