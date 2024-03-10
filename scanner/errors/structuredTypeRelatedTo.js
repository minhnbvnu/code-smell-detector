function structuredTypeRelatedTo(source2, target2, reportErrors2, intersectionState) {
                    const saveErrorInfo = captureErrorCalculationState();
                    let result2 = structuredTypeRelatedToWorker(source2, target2, reportErrors2, intersectionState, saveErrorInfo);
                    if (relation !== identityRelation) {
                        if (!result2 && (source2.flags & 2097152 /* Intersection */ || source2.flags & 262144 /* TypeParameter */ && target2.flags & 1048576 /* Union */)) {
                            const constraint = getEffectiveConstraintOfIntersection(source2.flags & 2097152 /* Intersection */ ? source2.types : [source2], !!(target2.flags & 1048576 /* Union */));
                            if (constraint && everyType(constraint, (c) => c !== source2)) {
                                result2 = isRelatedTo(constraint, target2, 1 /* Source */, 
                                /*reportErrors*/
                                false, 
                                /*headMessage*/
                                void 0, intersectionState);
                            }
                        }
                        if (result2 && !(intersectionState & 2 /* Target */) && target2.flags & 2097152 /* Intersection */ && !isGenericObjectType(target2) && source2.flags & (524288 /* Object */ | 2097152 /* Intersection */)) {
                            result2 &= propertiesRelatedTo(source2, target2, reportErrors2, 
                            /*excludedProperties*/
                            void 0, 
                            /*optionalsOnly*/
                            false, 0 /* None */);
                            if (result2 && isObjectLiteralType2(source2) && getObjectFlags(source2) & 8192 /* FreshLiteral */) {
                                result2 &= indexSignaturesRelatedTo(source2, target2, 
                                /*sourceIsPrimitive*/
                                false, reportErrors2, 0 /* None */);
                            }
                        }
                        else if (result2 && isNonGenericObjectType(target2) && !isArrayOrTupleType(target2) && source2.flags & 2097152 /* Intersection */ && getApparentType(source2).flags & 3670016 /* StructuredType */ && !some(source2.types, (t) => t === target2 || !!(getObjectFlags(t) & 262144 /* NonInferrableType */))) {
                            result2 &= propertiesRelatedTo(source2, target2, reportErrors2, 
                            /*excludedProperties*/
                            void 0, 
                            /*optionalsOnly*/
                            true, intersectionState);
                        }
                    }
                    if (result2) {
                        resetErrorInfo(saveErrorInfo);
                    }
                    return result2;
                }