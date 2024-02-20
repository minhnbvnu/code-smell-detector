function checkIfTypePredicateVariableIsDeclaredInBindingPattern(pattern, predicateVariableNode, predicateVariableName) {
                for (const element of pattern.elements) {
                    if (isOmittedExpression(element)) {
                        continue;
                    }
                    const name = element.name;
                    if (name.kind === 79 /* Identifier */ && name.escapedText === predicateVariableName) {
                        error(predicateVariableNode, Diagnostics.A_type_predicate_cannot_reference_element_0_in_a_binding_pattern, predicateVariableName);
                        return true;
                    }
                    else if (name.kind === 204 /* ArrayBindingPattern */ || name.kind === 203 /* ObjectBindingPattern */) {
                        if (checkIfTypePredicateVariableIsDeclaredInBindingPattern(name, predicateVariableNode, predicateVariableName)) {
                            return true;
                        }
                    }
                }
            }