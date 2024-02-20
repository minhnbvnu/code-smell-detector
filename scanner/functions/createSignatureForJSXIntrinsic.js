function createSignatureForJSXIntrinsic(node, result) {
                const namespace = getJsxNamespaceAt(node);
                const exports = namespace && getExportsOfSymbol(namespace);
                const typeSymbol = exports && getSymbol2(exports, JsxNames.Element, 788968 /* Type */);
                const returnNode = typeSymbol && nodeBuilder.symbolToEntityName(typeSymbol, 788968 /* Type */, node);
                const declaration = factory.createFunctionTypeNode(
                /*typeParameters*/
                void 0, [factory.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotdotdot*/
                    void 0, "props", 
                    /*questionMark*/
                    void 0, nodeBuilder.typeToTypeNode(result, node))], returnNode ? factory.createTypeReferenceNode(returnNode, 
                /*typeArguments*/
                void 0) : factory.createKeywordTypeNode(131 /* AnyKeyword */));
                const parameterSymbol = createSymbol(1 /* FunctionScopedVariable */, "props");
                parameterSymbol.links.type = result;
                return createSignature(declaration, 
                /*typeParameters*/
                void 0, 
                /*thisParameter*/
                void 0, [parameterSymbol], typeSymbol ? getDeclaredTypeOfSymbol(typeSymbol) : errorType, 
                /*returnTypePredicate*/
                void 0, 1, 0 /* None */);
            }