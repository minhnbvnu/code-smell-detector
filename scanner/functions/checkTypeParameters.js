function checkTypeParameters(typeParameterDeclarations) {
                let seenDefault = false;
                if (typeParameterDeclarations) {
                    for (let i = 0; i < typeParameterDeclarations.length; i++) {
                        const node = typeParameterDeclarations[i];
                        checkTypeParameter(node);
                        addLazyDiagnostic(createCheckTypeParameterDiagnostic(node, i));
                    }
                }
                function createCheckTypeParameterDiagnostic(node, i) {
                    return () => {
                        if (node.default) {
                            seenDefault = true;
                            checkTypeParametersNotReferenced(node.default, typeParameterDeclarations, i);
                        }
                        else if (seenDefault) {
                            error(node, Diagnostics.Required_type_parameters_may_not_follow_optional_type_parameters);
                        }
                        for (let j = 0; j < i; j++) {
                            if (typeParameterDeclarations[j].symbol === node.symbol) {
                                error(node.name, Diagnostics.Duplicate_identifier_0, declarationNameToString(node.name));
                            }
                        }
                    };
                }
            }