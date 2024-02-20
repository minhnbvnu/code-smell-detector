function createTypeParameterDeclaration(modifiers, name, constraint, defaultType) {
                const node = createBaseDeclaration(165 /* TypeParameter */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.constraint = constraint;
                node.default = defaultType;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.expression = void 0;
                node.jsDoc = void 0;
                return node;
            }