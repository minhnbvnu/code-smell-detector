function checkArrayLiteral(node, checkMode, forceTuple) {
                const elements = node.elements;
                const elementCount = elements.length;
                const elementTypes = [];
                const elementFlags = [];
                pushCachedContextualType(node);
                const inDestructuringPattern = isAssignmentTarget(node);
                const inConstContext = isConstContext(node);
                const contextualType = getApparentTypeOfContextualType(node, 
                /*contextFlags*/
                void 0);
                const inTupleContext = !!contextualType && someType(contextualType, isTupleLikeType);
                let hasOmittedExpression = false;
                for (let i = 0; i < elementCount; i++) {
                    const e = elements[i];
                    if (e.kind === 227 /* SpreadElement */) {
                        if (languageVersion < 2 /* ES2015 */) {
                            checkExternalEmitHelpers(e, compilerOptions.downlevelIteration ? 1536 /* SpreadIncludes */ : 1024 /* SpreadArray */);
                        }
                        const spreadType = checkExpression(e.expression, checkMode, forceTuple);
                        if (isArrayLikeType(spreadType)) {
                            elementTypes.push(spreadType);
                            elementFlags.push(8 /* Variadic */);
                        }
                        else if (inDestructuringPattern) {
                            const restElementType = getIndexTypeOfType(spreadType, numberType) || getIteratedTypeOrElementType(65 /* Destructuring */, spreadType, undefinedType, 
                            /*errorNode*/
                            void 0, 
                            /*checkAssignability*/
                            false) || unknownType;
                            elementTypes.push(restElementType);
                            elementFlags.push(4 /* Rest */);
                        }
                        else {
                            elementTypes.push(checkIteratedTypeOrElementType(33 /* Spread */, spreadType, undefinedType, e.expression));
                            elementFlags.push(4 /* Rest */);
                        }
                    }
                    else if (exactOptionalPropertyTypes && e.kind === 229 /* OmittedExpression */) {
                        hasOmittedExpression = true;
                        elementTypes.push(undefinedOrMissingType);
                        elementFlags.push(2 /* Optional */);
                    }
                    else {
                        const type = checkExpressionForMutableLocation(e, checkMode, forceTuple);
                        elementTypes.push(addOptionality(type, 
                        /*isProperty*/
                        true, hasOmittedExpression));
                        elementFlags.push(hasOmittedExpression ? 2 /* Optional */ : 1 /* Required */);
                        if (inTupleContext && checkMode && checkMode & 2 /* Inferential */ && !(checkMode & 4 /* SkipContextSensitive */) && isContextSensitive(e)) {
                            const inferenceContext = getInferenceContext(node);
                            Debug.assert(inferenceContext);
                            addIntraExpressionInferenceSite(inferenceContext, e, type);
                        }
                    }
                }
                popContextualType();
                if (inDestructuringPattern) {
                    return createTupleType(elementTypes, elementFlags);
                }
                if (forceTuple || inConstContext || inTupleContext) {
                    return createArrayLiteralType(createTupleType(elementTypes, elementFlags, 
                    /*readonly*/
                    inConstContext));
                }
                return createArrayLiteralType(createArrayType(elementTypes.length ? getUnionType(sameMap(elementTypes, (t, i) => elementFlags[i] & 8 /* Variadic */ ? getIndexedAccessTypeOrUndefined(t, numberType) || anyType : t), 2 /* Subtype */) : strictNullChecks ? implicitNeverType : undefinedWideningType, inConstContext));
            }