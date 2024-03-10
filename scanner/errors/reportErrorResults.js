function reportErrorResults(originalSource, originalTarget, source2, target2, headMessage2) {
                    var _a3, _b;
                    const sourceHasBase = !!getSingleBaseForNonAugmentingSubtype(originalSource);
                    const targetHasBase = !!getSingleBaseForNonAugmentingSubtype(originalTarget);
                    source2 = originalSource.aliasSymbol || sourceHasBase ? originalSource : source2;
                    target2 = originalTarget.aliasSymbol || targetHasBase ? originalTarget : target2;
                    let maybeSuppress = overrideNextErrorInfo > 0;
                    if (maybeSuppress) {
                        overrideNextErrorInfo--;
                    }
                    if (source2.flags & 524288 /* Object */ && target2.flags & 524288 /* Object */) {
                        const currentError = errorInfo;
                        tryElaborateArrayLikeErrors(source2, target2, 
                        /*reportErrors*/
                        true);
                        if (errorInfo !== currentError) {
                            maybeSuppress = !!errorInfo;
                        }
                    }
                    if (source2.flags & 524288 /* Object */ && target2.flags & 134348796 /* Primitive */) {
                        tryElaborateErrorsForPrimitivesAndObjects(source2, target2);
                    }
                    else if (source2.symbol && source2.flags & 524288 /* Object */ && globalObjectType === source2) {
                        reportError(Diagnostics.The_Object_type_is_assignable_to_very_few_other_types_Did_you_mean_to_use_the_any_type_instead);
                    }
                    else if (getObjectFlags(source2) & 2048 /* JsxAttributes */ && target2.flags & 2097152 /* Intersection */) {
                        const targetTypes = target2.types;
                        const intrinsicAttributes = getJsxType(JsxNames.IntrinsicAttributes, errorNode);
                        const intrinsicClassAttributes = getJsxType(JsxNames.IntrinsicClassAttributes, errorNode);
                        if (!isErrorType(intrinsicAttributes) && !isErrorType(intrinsicClassAttributes) && (contains(targetTypes, intrinsicAttributes) || contains(targetTypes, intrinsicClassAttributes))) {
                            return;
                        }
                    }
                    else {
                        errorInfo = elaborateNeverIntersection(errorInfo, originalTarget);
                    }
                    if (!headMessage2 && maybeSuppress) {
                        lastSkippedInfo = [source2, target2];
                        return;
                    }
                    reportRelationError(headMessage2, source2, target2);
                    if (source2.flags & 262144 /* TypeParameter */ && ((_b = (_a3 = source2.symbol) == null ? void 0 : _a3.declarations) == null ? void 0 : _b[0]) && !getConstraintOfType(source2)) {
                        const syntheticParam = cloneTypeParameter(source2);
                        syntheticParam.constraint = instantiateType(target2, makeUnaryTypeMapper(source2, syntheticParam));
                        if (hasNonCircularBaseConstraint(syntheticParam)) {
                            const targetConstraintString = typeToString(target2, source2.symbol.declarations[0]);
                            associateRelatedInfo(createDiagnosticForNode(source2.symbol.declarations[0], Diagnostics.This_type_parameter_might_need_an_extends_0_constraint, targetConstraintString));
                        }
                    }
                }