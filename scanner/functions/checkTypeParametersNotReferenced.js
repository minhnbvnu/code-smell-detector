function checkTypeParametersNotReferenced(root, typeParameters, index) {
                visit(root);
                function visit(node) {
                    if (node.kind === 180 /* TypeReference */) {
                        const type = getTypeFromTypeReference(node);
                        if (type.flags & 262144 /* TypeParameter */) {
                            for (let i = index; i < typeParameters.length; i++) {
                                if (type.symbol === getSymbolOfDeclaration(typeParameters[i])) {
                                    error(node, Diagnostics.Type_parameter_defaults_can_only_reference_previously_declared_type_parameters);
                                }
                            }
                        }
                    }
                    forEachChild(node, visit);
                }
            }