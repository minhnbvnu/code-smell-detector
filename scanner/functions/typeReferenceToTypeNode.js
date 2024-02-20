function typeReferenceToTypeNode(type2) {
                        let typeArguments = getTypeArguments(type2);
                        if (type2.target === globalArrayType || type2.target === globalReadonlyArrayType) {
                            if (context.flags & 2 /* WriteArrayAsGenericType */) {
                                const typeArgumentNode = typeToTypeNodeHelper(typeArguments[0], context);
                                return factory.createTypeReferenceNode(type2.target === globalArrayType ? "Array" : "ReadonlyArray", [typeArgumentNode]);
                            }
                            const elementType = typeToTypeNodeHelper(typeArguments[0], context);
                            const arrayType = factory.createArrayTypeNode(elementType);
                            return type2.target === globalArrayType ? arrayType : factory.createTypeOperatorNode(146 /* ReadonlyKeyword */, arrayType);
                        }
                        else if (type2.target.objectFlags & 8 /* Tuple */) {
                            typeArguments = sameMap(typeArguments, (t, i) => removeMissingType(t, !!(type2.target.elementFlags[i] & 2 /* Optional */)));
                            if (typeArguments.length > 0) {
                                const arity = getTypeReferenceArity(type2);
                                const tupleConstituentNodes = mapToTypeNodes(typeArguments.slice(0, arity), context);
                                if (tupleConstituentNodes) {
                                    if (type2.target.labeledElementDeclarations) {
                                        for (let i = 0; i < tupleConstituentNodes.length; i++) {
                                            const flags = type2.target.elementFlags[i];
                                            tupleConstituentNodes[i] = factory.createNamedTupleMember(flags & 12 /* Variable */ ? factory.createToken(25 /* DotDotDotToken */) : void 0, factory.createIdentifier(unescapeLeadingUnderscores(getTupleElementLabel(type2.target.labeledElementDeclarations[i]))), flags & 2 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0, flags & 4 /* Rest */ ? factory.createArrayTypeNode(tupleConstituentNodes[i]) : tupleConstituentNodes[i]);
                                        }
                                    }
                                    else {
                                        for (let i = 0; i < Math.min(arity, tupleConstituentNodes.length); i++) {
                                            const flags = type2.target.elementFlags[i];
                                            tupleConstituentNodes[i] = flags & 12 /* Variable */ ? factory.createRestTypeNode(flags & 4 /* Rest */ ? factory.createArrayTypeNode(tupleConstituentNodes[i]) : tupleConstituentNodes[i]) : flags & 2 /* Optional */ ? factory.createOptionalTypeNode(tupleConstituentNodes[i]) : tupleConstituentNodes[i];
                                        }
                                    }
                                    const tupleTypeNode = setEmitFlags(factory.createTupleTypeNode(tupleConstituentNodes), 1 /* SingleLine */);
                                    return type2.target.readonly ? factory.createTypeOperatorNode(146 /* ReadonlyKeyword */, tupleTypeNode) : tupleTypeNode;
                                }
                            }
                            if (context.encounteredError || context.flags & 524288 /* AllowEmptyTuple */) {
                                const tupleTypeNode = setEmitFlags(factory.createTupleTypeNode([]), 1 /* SingleLine */);
                                return type2.target.readonly ? factory.createTypeOperatorNode(146 /* ReadonlyKeyword */, tupleTypeNode) : tupleTypeNode;
                            }
                            context.encounteredError = true;
                            return void 0;
                        }
                        else if (context.flags & 2048 /* WriteClassExpressionAsTypeLiteral */ && type2.symbol.valueDeclaration && isClassLike(type2.symbol.valueDeclaration) && !isValueSymbolAccessible(type2.symbol, context.enclosingDeclaration)) {
                            return createAnonymousTypeNode(type2);
                        }
                        else {
                            const outerTypeParameters = type2.target.outerTypeParameters;
                            let i = 0;
                            let resultType;
                            if (outerTypeParameters) {
                                const length2 = outerTypeParameters.length;
                                while (i < length2) {
                                    const start = i;
                                    const parent2 = getParentSymbolOfTypeParameter(outerTypeParameters[i]);
                                    do {
                                        i++;
                                    } while (i < length2 && getParentSymbolOfTypeParameter(outerTypeParameters[i]) === parent2);
                                    if (!rangeEquals(outerTypeParameters, typeArguments, start, i)) {
                                        const typeArgumentSlice = mapToTypeNodes(typeArguments.slice(start, i), context);
                                        const flags2 = context.flags;
                                        context.flags |= 16 /* ForbidIndexedAccessSymbolReferences */;
                                        const ref = symbolToTypeNode(parent2, context, 788968 /* Type */, typeArgumentSlice);
                                        context.flags = flags2;
                                        resultType = !resultType ? ref : appendReferenceToType(resultType, ref);
                                    }
                                }
                            }
                            let typeArgumentNodes;
                            if (typeArguments.length > 0) {
                                const typeParameterCount = (type2.target.typeParameters || emptyArray).length;
                                typeArgumentNodes = mapToTypeNodes(typeArguments.slice(i, typeParameterCount), context);
                            }
                            const flags = context.flags;
                            context.flags |= 16 /* ForbidIndexedAccessSymbolReferences */;
                            const finalRef = symbolToTypeNode(type2.symbol, context, 788968 /* Type */, typeArgumentNodes);
                            context.flags = flags;
                            return !resultType ? finalRef : appendReferenceToType(resultType, finalRef);
                        }
                    }