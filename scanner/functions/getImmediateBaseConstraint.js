function getImmediateBaseConstraint(t) {
                    if (!t.immediateBaseConstraint) {
                        if (!pushTypeResolution(t, 4 /* ImmediateBaseConstraint */)) {
                            return circularConstraintType;
                        }
                        let result;
                        const identity2 = getRecursionIdentity(t);
                        if (stack.length < 10 || stack.length < 50 && !contains(stack, identity2)) {
                            stack.push(identity2);
                            result = computeBaseConstraint(getSimplifiedType(t, 
                            /*writing*/
                            false));
                            stack.pop();
                        }
                        if (!popTypeResolution()) {
                            if (t.flags & 262144 /* TypeParameter */) {
                                const errorNode = getConstraintDeclaration(t);
                                if (errorNode) {
                                    const diagnostic = error(errorNode, Diagnostics.Type_parameter_0_has_a_circular_constraint, typeToString(t));
                                    if (currentNode && !isNodeDescendantOf(errorNode, currentNode) && !isNodeDescendantOf(currentNode, errorNode)) {
                                        addRelatedInfo(diagnostic, createDiagnosticForNode(currentNode, Diagnostics.Circularity_originates_in_type_at_this_location));
                                    }
                                }
                            }
                            result = circularConstraintType;
                        }
                        t.immediateBaseConstraint = result || noConstraintType;
                    }
                    return t.immediateBaseConstraint;
                }