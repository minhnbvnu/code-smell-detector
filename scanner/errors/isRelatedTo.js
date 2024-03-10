function isRelatedTo(originalSource, originalTarget, recursionFlags = 3 /* Both */, reportErrors2 = false, headMessage2, intersectionState = 0 /* None */) {
                    if (originalSource.flags & 524288 /* Object */ && originalTarget.flags & 134348796 /* Primitive */) {
                        if (relation === comparableRelation && !(originalTarget.flags & 131072 /* Never */) && isSimpleTypeRelatedTo(originalTarget, originalSource, relation) || isSimpleTypeRelatedTo(originalSource, originalTarget, relation, reportErrors2 ? reportError : void 0)) {
                            return -1 /* True */;
                        }
                        if (reportErrors2) {
                            reportErrorResults(originalSource, originalTarget, originalSource, originalTarget, headMessage2);
                        }
                        return 0 /* False */;
                    }
                    const source2 = getNormalizedType(originalSource, 
                    /*writing*/
                    false);
                    let target2 = getNormalizedType(originalTarget, 
                    /*writing*/
                    true);
                    if (source2 === target2)
                        return -1 /* True */;
                    if (relation === identityRelation) {
                        if (source2.flags !== target2.flags)
                            return 0 /* False */;
                        if (source2.flags & 67358815 /* Singleton */)
                            return -1 /* True */;
                        traceUnionsOrIntersectionsTooLarge(source2, target2);
                        return recursiveTypeRelatedTo(source2, target2, 
                        /*reportErrors*/
                        false, 0 /* None */, recursionFlags);
                    }
                    if (source2.flags & 262144 /* TypeParameter */ && getConstraintOfType(source2) === target2) {
                        return -1 /* True */;
                    }
                    if (source2.flags & 470302716 /* DefinitelyNonNullable */ && target2.flags & 1048576 /* Union */) {
                        const types = target2.types;
                        const candidate = types.length === 2 && types[0].flags & 98304 /* Nullable */ ? types[1] : types.length === 3 && types[0].flags & 98304 /* Nullable */ && types[1].flags & 98304 /* Nullable */ ? types[2] : void 0;
                        if (candidate && !(candidate.flags & 98304 /* Nullable */)) {
                            target2 = getNormalizedType(candidate, 
                            /*writing*/
                            true);
                            if (source2 === target2)
                                return -1 /* True */;
                        }
                    }
                    if (relation === comparableRelation && !(target2.flags & 131072 /* Never */) && isSimpleTypeRelatedTo(target2, source2, relation) || isSimpleTypeRelatedTo(source2, target2, relation, reportErrors2 ? reportError : void 0))
                        return -1 /* True */;
                    if (source2.flags & 469499904 /* StructuredOrInstantiable */ || target2.flags & 469499904 /* StructuredOrInstantiable */) {
                        const isPerformingExcessPropertyChecks = !(intersectionState & 2 /* Target */) && (isObjectLiteralType2(source2) && getObjectFlags(source2) & 8192 /* FreshLiteral */);
                        if (isPerformingExcessPropertyChecks) {
                            if (hasExcessProperties(source2, target2, reportErrors2)) {
                                if (reportErrors2) {
                                    reportRelationError(headMessage2, source2, originalTarget.aliasSymbol ? originalTarget : target2);
                                }
                                return 0 /* False */;
                            }
                        }
                        const isPerformingCommonPropertyChecks = (relation !== comparableRelation || isUnitType(source2)) && !(intersectionState & 2 /* Target */) && source2.flags & (134348796 /* Primitive */ | 524288 /* Object */ | 2097152 /* Intersection */) && source2 !== globalObjectType && target2.flags & (524288 /* Object */ | 2097152 /* Intersection */) && isWeakType(target2) && (getPropertiesOfType(source2).length > 0 || typeHasCallOrConstructSignatures(source2));
                        const isComparingJsxAttributes = !!(getObjectFlags(source2) & 2048 /* JsxAttributes */);
                        if (isPerformingCommonPropertyChecks && !hasCommonProperties(source2, target2, isComparingJsxAttributes)) {
                            if (reportErrors2) {
                                const sourceString = typeToString(originalSource.aliasSymbol ? originalSource : source2);
                                const targetString = typeToString(originalTarget.aliasSymbol ? originalTarget : target2);
                                const calls = getSignaturesOfType(source2, 0 /* Call */);
                                const constructs = getSignaturesOfType(source2, 1 /* Construct */);
                                if (calls.length > 0 && isRelatedTo(getReturnTypeOfSignature(calls[0]), target2, 1 /* Source */, 
                                /*reportErrors*/
                                false) || constructs.length > 0 && isRelatedTo(getReturnTypeOfSignature(constructs[0]), target2, 1 /* Source */, 
                                /*reportErrors*/
                                false)) {
                                    reportError(Diagnostics.Value_of_type_0_has_no_properties_in_common_with_type_1_Did_you_mean_to_call_it, sourceString, targetString);
                                }
                                else {
                                    reportError(Diagnostics.Type_0_has_no_properties_in_common_with_type_1, sourceString, targetString);
                                }
                            }
                            return 0 /* False */;
                        }
                        traceUnionsOrIntersectionsTooLarge(source2, target2);
                        const skipCaching = source2.flags & 1048576 /* Union */ && source2.types.length < 4 && !(target2.flags & 1048576 /* Union */) || target2.flags & 1048576 /* Union */ && target2.types.length < 4 && !(source2.flags & 469499904 /* StructuredOrInstantiable */);
                        const result2 = skipCaching ? unionOrIntersectionRelatedTo(source2, target2, reportErrors2, intersectionState) : recursiveTypeRelatedTo(source2, target2, reportErrors2, intersectionState, recursionFlags);
                        if (result2) {
                            return result2;
                        }
                    }
                    if (reportErrors2) {
                        reportErrorResults(originalSource, originalTarget, source2, target2, headMessage2);
                    }
                    return 0 /* False */;
                }