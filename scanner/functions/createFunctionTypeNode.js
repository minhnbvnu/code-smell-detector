function createFunctionTypeNode(typeParameters, parameters, type) {
                const node = createBaseDeclaration(181 /* FunctionType */);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = asNodeArray(parameters);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.modifiers = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.typeArguments = void 0;
                return node;
            }