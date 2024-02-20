function getResolvedBaseConstraint(type) {
                if (type.resolvedBaseConstraint) {
                    return type.resolvedBaseConstraint;
                }
                const stack = [];
                return type.resolvedBaseConstraint = getTypeWithThisArgument(getImmediateBaseConstraint(type), type);
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
                function getBaseConstraint(t) {
                    const c = getImmediateBaseConstraint(t);
                    return c !== noConstraintType && c !== circularConstraintType ? c : void 0;
                }
                function computeBaseConstraint(t) {
                    if (t.flags & 262144 /* TypeParameter */) {
                        const constraint = getConstraintFromTypeParameter(t);
                        return t.isThisType || !constraint ? constraint : getBaseConstraint(constraint);
                    }
                    if (t.flags & 3145728 /* UnionOrIntersection */) {
                        const types = t.types;
                        const baseTypes = [];
                        let different = false;
                        for (const type2 of types) {
                            const baseType = getBaseConstraint(type2);
                            if (baseType) {
                                if (baseType !== type2) {
                                    different = true;
                                }
                                baseTypes.push(baseType);
                            }
                            else {
                                different = true;
                            }
                        }
                        if (!different) {
                            return t;
                        }
                        return t.flags & 1048576 /* Union */ && baseTypes.length === types.length ? getUnionType(baseTypes) : t.flags & 2097152 /* Intersection */ && baseTypes.length ? getIntersectionType(baseTypes) : void 0;
                    }
                    if (t.flags & 4194304 /* Index */) {
                        return keyofConstraintType;
                    }
                    if (t.flags & 134217728 /* TemplateLiteral */) {
                        const types = t.types;
                        const constraints = mapDefined(types, getBaseConstraint);
                        return constraints.length === types.length ? getTemplateLiteralType(t.texts, constraints) : stringType;
                    }
                    if (t.flags & 268435456 /* StringMapping */) {
                        const constraint = getBaseConstraint(t.type);
                        return constraint && constraint !== t.type ? getStringMappingType(t.symbol, constraint) : stringType;
                    }
                    if (t.flags & 8388608 /* IndexedAccess */) {
                        if (isMappedTypeGenericIndexedAccess(t)) {
                            return getBaseConstraint(substituteIndexedMappedType(t.objectType, t.indexType));
                        }
                        const baseObjectType = getBaseConstraint(t.objectType);
                        const baseIndexType = getBaseConstraint(t.indexType);
                        const baseIndexedAccess = baseObjectType && baseIndexType && getIndexedAccessTypeOrUndefined(baseObjectType, baseIndexType, t.accessFlags);
                        return baseIndexedAccess && getBaseConstraint(baseIndexedAccess);
                    }
                    if (t.flags & 16777216 /* Conditional */) {
                        const constraint = getConstraintFromConditionalType(t);
                        return constraint && getBaseConstraint(constraint);
                    }
                    if (t.flags & 33554432 /* Substitution */) {
                        return getBaseConstraint(getSubstitutionIntersection(t));
                    }
                    return t;
                }
            }