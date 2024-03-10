function getInferredTypeParameterConstraint(typeParameter, omitTypeReferences) {
                var _a2;
                let inferences;
                if ((_a2 = typeParameter.symbol) == null ? void 0 : _a2.declarations) {
                    for (const declaration of typeParameter.symbol.declarations) {
                        if (declaration.parent.kind === 192 /* InferType */) {
                            const [childTypeParameter = declaration.parent, grandParent] = walkUpParenthesizedTypesAndGetParentAndChild(declaration.parent.parent);
                            if (grandParent.kind === 180 /* TypeReference */ && !omitTypeReferences) {
                                const typeReference = grandParent;
                                const typeParameters = getTypeParametersForTypeReferenceOrImport(typeReference);
                                if (typeParameters) {
                                    const index = typeReference.typeArguments.indexOf(childTypeParameter);
                                    if (index < typeParameters.length) {
                                        const declaredConstraint = getConstraintOfTypeParameter(typeParameters[index]);
                                        if (declaredConstraint) {
                                            const mapper = makeDeferredTypeMapper(typeParameters, typeParameters.map((_, index2) => () => {
                                                return getEffectiveTypeArgumentAtIndex(typeReference, typeParameters, index2);
                                            }));
                                            const constraint = instantiateType(declaredConstraint, mapper);
                                            if (constraint !== typeParameter) {
                                                inferences = append(inferences, constraint);
                                            }
                                        }
                                    }
                                }
                            }
                            else if (grandParent.kind === 166 /* Parameter */ && grandParent.dotDotDotToken || grandParent.kind === 188 /* RestType */ || grandParent.kind === 199 /* NamedTupleMember */ && grandParent.dotDotDotToken) {
                                inferences = append(inferences, createArrayType(unknownType));
                            }
                            else if (grandParent.kind === 201 /* TemplateLiteralTypeSpan */) {
                                inferences = append(inferences, stringType);
                            }
                            else if (grandParent.kind === 165 /* TypeParameter */ && grandParent.parent.kind === 197 /* MappedType */) {
                                inferences = append(inferences, keyofConstraintType);
                            }
                            else if (grandParent.kind === 197 /* MappedType */ && grandParent.type && skipParentheses(grandParent.type) === declaration.parent && grandParent.parent.kind === 191 /* ConditionalType */ && grandParent.parent.extendsType === grandParent && grandParent.parent.checkType.kind === 197 /* MappedType */ && grandParent.parent.checkType.type) {
                                const checkMappedType2 = grandParent.parent.checkType;
                                const nodeType = getTypeFromTypeNode(checkMappedType2.type);
                                inferences = append(inferences, instantiateType(nodeType, makeUnaryTypeMapper(getDeclaredTypeOfTypeParameter(getSymbolOfDeclaration(checkMappedType2.typeParameter)), checkMappedType2.typeParameter.constraint ? getTypeFromTypeNode(checkMappedType2.typeParameter.constraint) : keyofConstraintType)));
                            }
                        }
                    }
                }
                return inferences && getIntersectionType(inferences);
            }