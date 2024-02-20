function assignContextualParameterTypes(signature, context) {
                if (context.typeParameters) {
                    if (!signature.typeParameters) {
                        signature.typeParameters = context.typeParameters;
                    }
                    else {
                        return;
                    }
                }
                if (context.thisParameter) {
                    const parameter = signature.thisParameter;
                    if (!parameter || parameter.valueDeclaration && !parameter.valueDeclaration.type) {
                        if (!parameter) {
                            signature.thisParameter = createSymbolWithType(context.thisParameter, 
                            /*type*/
                            void 0);
                        }
                        assignParameterType(signature.thisParameter, getTypeOfSymbol(context.thisParameter));
                    }
                }
                const len = signature.parameters.length - (signatureHasRestParameter(signature) ? 1 : 0);
                for (let i = 0; i < len; i++) {
                    const parameter = signature.parameters[i];
                    if (!getEffectiveTypeAnnotationNode(parameter.valueDeclaration)) {
                        const contextualParameterType = tryGetTypeAtPosition(context, i);
                        assignParameterType(parameter, contextualParameterType);
                    }
                }
                if (signatureHasRestParameter(signature)) {
                    const parameter = last(signature.parameters);
                    if (parameter.valueDeclaration ? !getEffectiveTypeAnnotationNode(parameter.valueDeclaration) : !!(getCheckFlags(parameter) & 65536 /* DeferredType */)) {
                        const contextualParameterType = getRestTypeAtPosition(context, len);
                        assignParameterType(parameter, contextualParameterType);
                    }
                }
            }