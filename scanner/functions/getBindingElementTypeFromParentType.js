function getBindingElementTypeFromParentType(declaration, parentType) {
                if (isTypeAny(parentType)) {
                    return parentType;
                }
                const pattern = declaration.parent;
                if (strictNullChecks && declaration.flags & 16777216 /* Ambient */ && isParameterDeclaration(declaration)) {
                    parentType = getNonNullableType(parentType);
                }
                else if (strictNullChecks && pattern.parent.initializer && !(getTypeFacts(getTypeOfInitializer(pattern.parent.initializer)) & 65536 /* EQUndefined */)) {
                    parentType = getTypeWithFacts(parentType, 524288 /* NEUndefined */);
                }
                let type;
                if (pattern.kind === 203 /* ObjectBindingPattern */) {
                    if (declaration.dotDotDotToken) {
                        parentType = getReducedType(parentType);
                        if (parentType.flags & 2 /* Unknown */ || !isValidSpreadType(parentType)) {
                            error(declaration, Diagnostics.Rest_types_may_only_be_created_from_object_types);
                            return errorType;
                        }
                        const literalMembers = [];
                        for (const element of pattern.elements) {
                            if (!element.dotDotDotToken) {
                                literalMembers.push(element.propertyName || element.name);
                            }
                        }
                        type = getRestType(parentType, literalMembers, declaration.symbol);
                    }
                    else {
                        const name = declaration.propertyName || declaration.name;
                        const indexType = getLiteralTypeFromPropertyName(name);
                        const declaredType = getIndexedAccessType(parentType, indexType, 32 /* ExpressionPosition */, name);
                        type = getFlowTypeOfDestructuring(declaration, declaredType);
                    }
                }
                else {
                    const elementType = checkIteratedTypeOrElementType(65 /* Destructuring */ | (declaration.dotDotDotToken ? 0 : 128 /* PossiblyOutOfBounds */), parentType, undefinedType, pattern);
                    const index = pattern.elements.indexOf(declaration);
                    if (declaration.dotDotDotToken) {
                        const baseConstraint = getBaseConstraintOrType(parentType);
                        type = everyType(baseConstraint, isTupleType) ? mapType(baseConstraint, (t) => sliceTupleType(t, index)) : createArrayType(elementType);
                    }
                    else if (isArrayLikeType(parentType)) {
                        const indexType = getNumberLiteralType(index);
                        const accessFlags = 32 /* ExpressionPosition */ | (hasDefaultValue(declaration) ? 16 /* NoTupleBoundsCheck */ : 0);
                        const declaredType = getIndexedAccessTypeOrUndefined(parentType, indexType, accessFlags, declaration.name) || errorType;
                        type = getFlowTypeOfDestructuring(declaration, declaredType);
                    }
                    else {
                        type = elementType;
                    }
                }
                if (!declaration.initializer) {
                    return type;
                }
                if (getEffectiveTypeAnnotationNode(walkUpBindingElementsAndPatterns(declaration))) {
                    return strictNullChecks && !(getTypeFacts(checkDeclarationInitializer(declaration, 0 /* Normal */)) & 16777216 /* IsUndefined */) ? getNonUndefinedType(type) : type;
                }
                return widenTypeInferredFromInitializer(declaration, getUnionType([getNonUndefinedType(type), checkDeclarationInitializer(declaration, 0 /* Normal */)], 2 /* Subtype */));
            }