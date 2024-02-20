function createJSDocFunctionType(parameters, type) {
                const node = createBaseDeclaration(320 /* JSDocFunctionType */);
                node.parameters = asNodeArray(parameters);
                node.type = type;
                node.transformFlags = propagateChildrenFlags(node.parameters) | (node.type ? 1 /* ContainsTypeScript */ : 0 /* None */);
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.typeArguments = void 0;
                return node;
            }