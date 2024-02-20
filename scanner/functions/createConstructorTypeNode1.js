function createConstructorTypeNode1(modifiers, typeParameters, parameters, type) {
                const node = createBaseDeclaration(182 /* ConstructorType */);
                node.modifiers = asNodeArray(modifiers);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = asNodeArray(parameters);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.typeArguments = void 0;
                return node;
            }