function findBaseOfDeclaration(checker, declaration, cb) {
            var _a2;
            const classOrInterfaceDeclaration = ((_a2 = declaration.parent) == null ? void 0 : _a2.kind) === 173 /* Constructor */ ? declaration.parent.parent : declaration.parent;
            if (!classOrInterfaceDeclaration)
                return;
            const isStaticMember = hasStaticModifier(declaration);
            return firstDefined(getAllSuperTypeNodes(classOrInterfaceDeclaration), (superTypeNode) => {
                const baseType = checker.getTypeAtLocation(superTypeNode);
                const type = isStaticMember && baseType.symbol ? checker.getTypeOfSymbol(baseType.symbol) : baseType;
                const symbol = checker.getPropertyOfType(type, declaration.symbol.name);
                return symbol ? cb(symbol) : void 0;
            });
        }