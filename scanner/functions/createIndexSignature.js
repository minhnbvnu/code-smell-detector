function createIndexSignature(modifiers, parameters, type) {
                const node = createBaseDeclaration(178 /* IndexSignature */);
                node.modifiers = asNodeArray(modifiers);
                node.parameters = asNodeArray(parameters);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.typeArguments = void 0;
                return node;
            }