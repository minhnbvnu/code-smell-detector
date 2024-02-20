function createJSDocSignature(typeParameters, parameters, type) {
                const node = createBaseDeclaration(326 /* JSDocSignature */);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = createNodeArray(parameters);
                node.type = type;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }