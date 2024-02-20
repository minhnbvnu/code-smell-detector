function inferFromAnnotatedParameters(signature, context, inferenceContext) {
                const len = signature.parameters.length - (signatureHasRestParameter(signature) ? 1 : 0);
                for (let i = 0; i < len; i++) {
                    const declaration = signature.parameters[i].valueDeclaration;
                    if (declaration.type) {
                        const typeNode = getEffectiveTypeAnnotationNode(declaration);
                        if (typeNode) {
                            inferTypes(inferenceContext.inferences, getTypeFromTypeNode(typeNode), getTypeAtPosition(context, i));
                        }
                    }
                }
            }