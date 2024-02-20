function createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members) {
                const node = createBaseDeclaration(261 /* InterfaceDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.typeParameters = asNodeArray(typeParameters);
                node.heritageClauses = asNodeArray(heritageClauses);
                node.members = createNodeArray(members);
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                return node;
            }