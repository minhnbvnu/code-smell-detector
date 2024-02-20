function checkTypePredicate(node) {
                const parent2 = getTypePredicateParent(node);
                if (!parent2) {
                    error(node, Diagnostics.A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods);
                    return;
                }
                const signature = getSignatureFromDeclaration(parent2);
                const typePredicate = getTypePredicateOfSignature(signature);
                if (!typePredicate) {
                    return;
                }
                checkSourceElement(node.type);
                const { parameterName } = node;
                if (typePredicate.kind === 0 /* This */ || typePredicate.kind === 2 /* AssertsThis */) {
                    getTypeFromThisTypeNode(parameterName);
                }
                else {
                    if (typePredicate.parameterIndex >= 0) {
                        if (signatureHasRestParameter(signature) && typePredicate.parameterIndex === signature.parameters.length - 1) {
                            error(parameterName, Diagnostics.A_type_predicate_cannot_reference_a_rest_parameter);
                        }
                        else {
                            if (typePredicate.type) {
                                const leadingError = () => chainDiagnosticMessages(
                                /*details*/
                                void 0, Diagnostics.A_type_predicate_s_type_must_be_assignable_to_its_parameter_s_type);
                                checkTypeAssignableTo(typePredicate.type, getTypeOfSymbol(signature.parameters[typePredicate.parameterIndex]), node.type, 
                                /*headMessage*/
                                void 0, leadingError);
                            }
                        }
                    }
                    else if (parameterName) {
                        let hasReportedError = false;
                        for (const { name } of parent2.parameters) {
                            if (isBindingPattern(name) && checkIfTypePredicateVariableIsDeclaredInBindingPattern(name, parameterName, typePredicate.parameterName)) {
                                hasReportedError = true;
                                break;
                            }
                        }
                        if (!hasReportedError) {
                            error(node.parameterName, Diagnostics.Cannot_find_parameter_0, typePredicate.parameterName);
                        }
                    }
                }
            }