function updateAccessorParamsList(input, isPrivate) {
                let newParams;
                if (!isPrivate) {
                    const thisParameter = getThisParameter(input);
                    if (thisParameter) {
                        newParams = [ensureParameter(thisParameter)];
                    }
                }
                if (isSetAccessorDeclaration(input)) {
                    let newValueParameter;
                    if (!isPrivate) {
                        const valueParameter = getSetAccessorValueParameter(input);
                        if (valueParameter) {
                            const accessorType = getTypeAnnotationFromAllAccessorDeclarations(input, resolver.getAllAccessorDeclarations(input));
                            newValueParameter = ensureParameter(valueParameter, 
                            /*modifierMask*/
                            void 0, accessorType);
                        }
                    }
                    if (!newValueParameter) {
                        newValueParameter = factory2.createParameterDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*dotDotDotToken*/
                        void 0, "value");
                    }
                    newParams = append(newParams, newValueParameter);
                }
                return factory2.createNodeArray(newParams || emptyArray);
            }