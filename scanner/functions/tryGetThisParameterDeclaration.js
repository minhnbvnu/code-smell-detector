function tryGetThisParameterDeclaration(signature, context) {
                    if (signature.thisParameter) {
                        return symbolToParameterDeclaration(signature.thisParameter, context);
                    }
                    if (signature.declaration && isInJSFile(signature.declaration)) {
                        const thisTag = getJSDocThisTag(signature.declaration);
                        if (thisTag && thisTag.typeExpression) {
                            return factory.createParameterDeclaration(
                            /* modifiers */
                            void 0, 
                            /* dotDotDotToken */
                            void 0, "this", 
                            /* questionToken */
                            void 0, typeToTypeNodeHelper(getTypeFromTypeNode(thisTag.typeExpression), context));
                        }
                    }
                }