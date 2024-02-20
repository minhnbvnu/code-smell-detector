function isPropertyAbstractOrInterface(declaration, baseDeclarationFlags) {
                return baseDeclarationFlags & 256 /* Abstract */ && (!isPropertyDeclaration(declaration) || !declaration.initializer) || isInterfaceDeclaration(declaration.parent);
            }