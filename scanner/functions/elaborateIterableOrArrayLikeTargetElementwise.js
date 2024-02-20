function elaborateIterableOrArrayLikeTargetElementwise(iterator, source, target, relation, containingMessageChain, errorOutputContainer) {
                const tupleOrArrayLikeTargetParts = filterType(target, isArrayOrTupleLikeType);
                const nonTupleOrArrayLikeTargetParts = filterType(target, (t) => !isArrayOrTupleLikeType(t));
                const iterationType = nonTupleOrArrayLikeTargetParts !== neverType ? getIterationTypeOfIterable(13 /* ForOf */, 0 /* Yield */, nonTupleOrArrayLikeTargetParts, 
                /*errorNode*/
                void 0) : void 0;
                let reportedError = false;
                for (let status = iterator.next(); !status.done; status = iterator.next()) {
                    const { errorNode: prop, innerExpression: next, nameType, errorMessage } = status.value;
                    let targetPropType = iterationType;
                    const targetIndexedPropType = tupleOrArrayLikeTargetParts !== neverType ? getBestMatchIndexedAccessTypeOrUndefined(source, tupleOrArrayLikeTargetParts, nameType) : void 0;
                    if (targetIndexedPropType && !(targetIndexedPropType.flags & 8388608 /* IndexedAccess */)) {
                        targetPropType = iterationType ? getUnionType([iterationType, targetIndexedPropType]) : targetIndexedPropType;
                    }
                    if (!targetPropType)
                        continue;
                    let sourcePropType = getIndexedAccessTypeOrUndefined(source, nameType);
                    if (!sourcePropType)
                        continue;
                    const propName = getPropertyNameFromIndex(nameType, 
                    /*accessNode*/
                    void 0);
                    if (!checkTypeRelatedTo(sourcePropType, targetPropType, relation, 
                    /*errorNode*/
                    void 0)) {
                        const elaborated = next && elaborateError(next, sourcePropType, targetPropType, relation, 
                        /*headMessage*/
                        void 0, containingMessageChain, errorOutputContainer);
                        reportedError = true;
                        if (!elaborated) {
                            const resultObj = errorOutputContainer || {};
                            const specificSource = next ? checkExpressionForMutableLocationWithContextualType(next, sourcePropType) : sourcePropType;
                            if (exactOptionalPropertyTypes && isExactOptionalPropertyMismatch(specificSource, targetPropType)) {
                                const diag2 = createDiagnosticForNode(prop, Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_type_of_the_target, typeToString(specificSource), typeToString(targetPropType));
                                diagnostics.add(diag2);
                                resultObj.errors = [diag2];
                            }
                            else {
                                const targetIsOptional = !!(propName && (getPropertyOfType(tupleOrArrayLikeTargetParts, propName) || unknownSymbol).flags & 16777216 /* Optional */);
                                const sourceIsOptional = !!(propName && (getPropertyOfType(source, propName) || unknownSymbol).flags & 16777216 /* Optional */);
                                targetPropType = removeMissingType(targetPropType, targetIsOptional);
                                sourcePropType = removeMissingType(sourcePropType, targetIsOptional && sourceIsOptional);
                                const result = checkTypeRelatedTo(specificSource, targetPropType, relation, prop, errorMessage, containingMessageChain, resultObj);
                                if (result && specificSource !== sourcePropType) {
                                    checkTypeRelatedTo(sourcePropType, targetPropType, relation, prop, errorMessage, containingMessageChain, resultObj);
                                }
                            }
                        }
                    }
                }
                return reportedError;
            }