function parseFunctionOrConstructorType() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        const modifiers = parseModifiersForConstructorType();
                        const isConstructorType = parseOptional(103 /* NewKeyword */);
                        Debug.assert(!modifiers || isConstructorType, "Per isStartOfFunctionOrConstructorType, a function type cannot have modifiers.");
                        const typeParameters = parseTypeParameters();
                        const parameters = parseParameters(4 /* Type */);
                        const type = parseReturnType(38 /* EqualsGreaterThanToken */, 
                        /*isType*/
                        false);
                        const node = isConstructorType ? factory2.createConstructorTypeNode(modifiers, typeParameters, parameters, type) : factory2.createFunctionTypeNode(typeParameters, parameters, type);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }