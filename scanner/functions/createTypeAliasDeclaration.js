function createTypeAliasDeclaration(modifiers, name, typeParameters, type) {
                const node = createBaseDeclaration(262 /* TypeAliasDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.typeParameters = asNodeArray(typeParameters);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }