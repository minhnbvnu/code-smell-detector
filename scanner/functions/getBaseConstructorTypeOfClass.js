function getBaseConstructorTypeOfClass(type) {
                if (!type.resolvedBaseConstructorType) {
                    const decl = getClassLikeDeclarationOfSymbol(type.symbol);
                    const extended = decl && getEffectiveBaseTypeNode(decl);
                    const baseTypeNode = getBaseTypeNodeOfClass(type);
                    if (!baseTypeNode) {
                        return type.resolvedBaseConstructorType = undefinedType;
                    }
                    if (!pushTypeResolution(type, 1 /* ResolvedBaseConstructorType */)) {
                        return errorType;
                    }
                    const baseConstructorType = checkExpression(baseTypeNode.expression);
                    if (extended && baseTypeNode !== extended) {
                        Debug.assert(!extended.typeArguments);
                        checkExpression(extended.expression);
                    }
                    if (baseConstructorType.flags & (524288 /* Object */ | 2097152 /* Intersection */)) {
                        resolveStructuredTypeMembers(baseConstructorType);
                    }
                    if (!popTypeResolution()) {
                        error(type.symbol.valueDeclaration, Diagnostics._0_is_referenced_directly_or_indirectly_in_its_own_base_expression, symbolToString(type.symbol));
                        return type.resolvedBaseConstructorType = errorType;
                    }
                    if (!(baseConstructorType.flags & 1 /* Any */) && baseConstructorType !== nullWideningType && !isConstructorType(baseConstructorType)) {
                        const err = error(baseTypeNode.expression, Diagnostics.Type_0_is_not_a_constructor_function_type, typeToString(baseConstructorType));
                        if (baseConstructorType.flags & 262144 /* TypeParameter */) {
                            const constraint = getConstraintFromTypeParameter(baseConstructorType);
                            let ctorReturn = unknownType;
                            if (constraint) {
                                const ctorSig = getSignaturesOfType(constraint, 1 /* Construct */);
                                if (ctorSig[0]) {
                                    ctorReturn = getReturnTypeOfSignature(ctorSig[0]);
                                }
                            }
                            if (baseConstructorType.symbol.declarations) {
                                addRelatedInfo(err, createDiagnosticForNode(baseConstructorType.symbol.declarations[0], Diagnostics.Did_you_mean_for_0_to_be_constrained_to_type_new_args_Colon_any_1, symbolToString(baseConstructorType.symbol), typeToString(ctorReturn)));
                            }
                        }
                        return type.resolvedBaseConstructorType = errorType;
                    }
                    type.resolvedBaseConstructorType = baseConstructorType;
                }
                return type.resolvedBaseConstructorType;
            }