function getConditionalFlowTypeOfType(type, node) {
                let constraints;
                let covariant = true;
                while (node && !isStatement(node) && node.kind !== 323 /* JSDoc */) {
                    const parent2 = node.parent;
                    if (parent2.kind === 166 /* Parameter */) {
                        covariant = !covariant;
                    }
                    if ((covariant || type.flags & 8650752 /* TypeVariable */) && parent2.kind === 191 /* ConditionalType */ && node === parent2.trueType) {
                        const constraint = getImpliedConstraint(type, parent2.checkType, parent2.extendsType);
                        if (constraint) {
                            constraints = append(constraints, constraint);
                        }
                    }
                    else if (type.flags & 262144 /* TypeParameter */ && parent2.kind === 197 /* MappedType */ && node === parent2.type) {
                        const mappedType = getTypeFromTypeNode(parent2);
                        if (getTypeParameterFromMappedType(mappedType) === getActualTypeVariable(type)) {
                            const typeParameter = getHomomorphicTypeVariable(mappedType);
                            if (typeParameter) {
                                const constraint = getConstraintOfTypeParameter(typeParameter);
                                if (constraint && everyType(constraint, isArrayOrTupleType)) {
                                    constraints = append(constraints, getUnionType([numberType, numericStringType]));
                                }
                            }
                        }
                    }
                    node = parent2;
                }
                return constraints ? getSubstitutionType(type, getIntersectionType(constraints)) : type;
            }