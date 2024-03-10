function checkTypeRelatedTo(source, target, relation, errorNode, headMessage, containingMessageChain, errorOutputContainer) {
                var _a2;
                let errorInfo;
                let relatedInfo;
                let maybeKeys;
                let sourceStack;
                let targetStack;
                let maybeCount = 0;
                let sourceDepth = 0;
                let targetDepth = 0;
                let expandingFlags = 0 /* None */;
                let overflow = false;
                let overrideNextErrorInfo = 0;
                let lastSkippedInfo;
                let incompatibleStack;
                Debug.assert(relation !== identityRelation || !errorNode, "no error reporting in identity checking");
                const result = isRelatedTo(source, target, 3 /* Both */, 
                /*reportErrors*/
                !!errorNode, headMessage);
                if (incompatibleStack) {
                    reportIncompatibleStack();
                }
                if (overflow) {
                    (_a2 = tracing) == null ? void 0 : _a2.instant(tracing.Phase.CheckTypes, "checkTypeRelatedTo_DepthLimit", { sourceId: source.id, targetId: target.id, depth: sourceDepth, targetDepth });
                    const diag2 = error(errorNode || currentNode, Diagnostics.Excessive_stack_depth_comparing_types_0_and_1, typeToString(source), typeToString(target));
                    if (errorOutputContainer) {
                        (errorOutputContainer.errors || (errorOutputContainer.errors = [])).push(diag2);
                    }
                }
                else if (errorInfo) {
                    if (containingMessageChain) {
                        const chain = containingMessageChain();
                        if (chain) {
                            concatenateDiagnosticMessageChains(chain, errorInfo);
                            errorInfo = chain;
                        }
                    }
                    let relatedInformation;
                    if (headMessage && errorNode && !result && source.symbol) {
                        const links = getSymbolLinks(source.symbol);
                        if (links.originatingImport && !isImportCall(links.originatingImport)) {
                            const helpfulRetry = checkTypeRelatedTo(getTypeOfSymbol(links.target), target, relation, 
                            /*errorNode*/
                            void 0);
                            if (helpfulRetry) {
                                const diag3 = createDiagnosticForNode(links.originatingImport, Diagnostics.Type_originates_at_this_import_A_namespace_style_import_cannot_be_called_or_constructed_and_will_cause_a_failure_at_runtime_Consider_using_a_default_import_or_import_require_here_instead);
                                relatedInformation = append(relatedInformation, diag3);
                            }
                        }
                    }
                    const diag2 = createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(errorNode), errorNode, errorInfo, relatedInformation);
                    if (relatedInfo) {
                        addRelatedInfo(diag2, ...relatedInfo);
                    }
                    if (errorOutputContainer) {
                        (errorOutputContainer.errors || (errorOutputContainer.errors = [])).push(diag2);
                    }
                    if (!errorOutputContainer || !errorOutputContainer.skipLogging) {
                        diagnostics.add(diag2);
                    }
                }
                if (errorNode && errorOutputContainer && errorOutputContainer.skipLogging && result === 0 /* False */) {
                    Debug.assert(!!errorOutputContainer.errors, "missed opportunity to interact with error.");
                }
                return result !== 0 /* False */;
                function resetErrorInfo(saved) {
                    errorInfo = saved.errorInfo;
                    lastSkippedInfo = saved.lastSkippedInfo;
                    incompatibleStack = saved.incompatibleStack;
                    overrideNextErrorInfo = saved.overrideNextErrorInfo;
                    relatedInfo = saved.relatedInfo;
                }
                function captureErrorCalculationState() {
                    return {
                        errorInfo,
                        lastSkippedInfo,
                        incompatibleStack: incompatibleStack == null ? void 0 : incompatibleStack.slice(),
                        overrideNextErrorInfo,
                        relatedInfo: relatedInfo == null ? void 0 : relatedInfo.slice()
                    };
                }
                function reportIncompatibleError(message, arg0, arg1, arg2, arg3) {
                    overrideNextErrorInfo++;
                    lastSkippedInfo = void 0;
                    (incompatibleStack || (incompatibleStack = [])).push([message, arg0, arg1, arg2, arg3]);
                }
                function reportIncompatibleStack() {
                    const stack = incompatibleStack || [];
                    incompatibleStack = void 0;
                    const info = lastSkippedInfo;
                    lastSkippedInfo = void 0;
                    if (stack.length === 1) {
                        reportError(...stack[0]);
                        if (info) {
                            reportRelationError(
                            /*headMessage*/
                            void 0, ...info);
                        }
                        return;
                    }
                    let path = "";
                    const secondaryRootErrors = [];
                    while (stack.length) {
                        const [msg, ...args] = stack.pop();
                        switch (msg.code) {
                            case Diagnostics.Types_of_property_0_are_incompatible.code: {
                                if (path.indexOf("new ") === 0) {
                                    path = `(${path})`;
                                }
                                const str = "" + args[0];
                                if (path.length === 0) {
                                    path = `${str}`;
                                }
                                else if (isIdentifierText(str, getEmitScriptTarget(compilerOptions))) {
                                    path = `${path}.${str}`;
                                }
                                else if (str[0] === "[" && str[str.length - 1] === "]") {
                                    path = `${path}${str}`;
                                }
                                else {
                                    path = `${path}[${str}]`;
                                }
                                break;
                            }
                            case Diagnostics.Call_signature_return_types_0_and_1_are_incompatible.code:
                            case Diagnostics.Construct_signature_return_types_0_and_1_are_incompatible.code:
                            case Diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code:
                            case Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code: {
                                if (path.length === 0) {
                                    let mappedMsg = msg;
                                    if (msg.code === Diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code) {
                                        mappedMsg = Diagnostics.Call_signature_return_types_0_and_1_are_incompatible;
                                    }
                                    else if (msg.code === Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code) {
                                        mappedMsg = Diagnostics.Construct_signature_return_types_0_and_1_are_incompatible;
                                    }
                                    secondaryRootErrors.unshift([mappedMsg, args[0], args[1]]);
                                }
                                else {
                                    const prefix = msg.code === Diagnostics.Construct_signature_return_types_0_and_1_are_incompatible.code || msg.code === Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code ? "new " : "";
                                    const params = msg.code === Diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code || msg.code === Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code ? "" : "...";
                                    path = `${prefix}${path}(${params})`;
                                }
                                break;
                            }
                            case Diagnostics.Type_at_position_0_in_source_is_not_compatible_with_type_at_position_1_in_target.code: {
                                secondaryRootErrors.unshift([Diagnostics.Type_at_position_0_in_source_is_not_compatible_with_type_at_position_1_in_target, args[0], args[1]]);
                                break;
                            }
                            case Diagnostics.Type_at_positions_0_through_1_in_source_is_not_compatible_with_type_at_position_2_in_target.code: {
                                secondaryRootErrors.unshift([Diagnostics.Type_at_positions_0_through_1_in_source_is_not_compatible_with_type_at_position_2_in_target, args[0], args[1], args[2]]);
                                break;
                            }
                            default:
                                return Debug.fail(`Unhandled Diagnostic: ${msg.code}`);
                        }
                    }
                    if (path) {
                        reportError(path[path.length - 1] === ")" ? Diagnostics.The_types_returned_by_0_are_incompatible_between_these_types : Diagnostics.The_types_of_0_are_incompatible_between_these_types, path);
                    }
                    else {
                        secondaryRootErrors.shift();
                    }
                    for (const [msg, ...args] of secondaryRootErrors) {
                        const originalValue = msg.elidedInCompatabilityPyramid;
                        msg.elidedInCompatabilityPyramid = false;
                        reportError(msg, ...args);
                        msg.elidedInCompatabilityPyramid = originalValue;
                    }
                    if (info) {
                        reportRelationError(
                        /*headMessage*/
                        void 0, ...info);
                    }
                }
                function reportError(message, arg0, arg1, arg2, arg3) {
                    Debug.assert(!!errorNode);
                    if (incompatibleStack)
                        reportIncompatibleStack();
                    if (message.elidedInCompatabilityPyramid)
                        return;
                    errorInfo = chainDiagnosticMessages(errorInfo, message, arg0, arg1, arg2, arg3);
                }
                function associateRelatedInfo(info) {
                    Debug.assert(!!errorInfo);
                    if (!relatedInfo) {
                        relatedInfo = [info];
                    }
                    else {
                        relatedInfo.push(info);
                    }
                }
                function reportRelationError(message, source2, target2) {
                    if (incompatibleStack)
                        reportIncompatibleStack();
                    const [sourceType, targetType] = getTypeNamesForErrorDisplay(source2, target2);
                    let generalizedSource = source2;
                    let generalizedSourceType = sourceType;
                    if (isLiteralType(source2) && !typeCouldHaveTopLevelSingletonTypes(target2)) {
                        generalizedSource = getBaseTypeOfLiteralType(source2);
                        Debug.assert(!isTypeAssignableTo(generalizedSource, target2), "generalized source shouldn't be assignable");
                        generalizedSourceType = getTypeNameForErrorDisplay(generalizedSource);
                    }
                    const targetFlags = target2.flags & 8388608 /* IndexedAccess */ && !(source2.flags & 8388608 /* IndexedAccess */) ? target2.objectType.flags : target2.flags;
                    if (targetFlags & 262144 /* TypeParameter */ && target2 !== markerSuperTypeForCheck && target2 !== markerSubTypeForCheck) {
                        const constraint = getBaseConstraintOfType(target2);
                        let needsOriginalSource;
                        if (constraint && (isTypeAssignableTo(generalizedSource, constraint) || (needsOriginalSource = isTypeAssignableTo(source2, constraint)))) {
                            reportError(Diagnostics._0_is_assignable_to_the_constraint_of_type_1_but_1_could_be_instantiated_with_a_different_subtype_of_constraint_2, needsOriginalSource ? sourceType : generalizedSourceType, targetType, typeToString(constraint));
                        }
                        else {
                            errorInfo = void 0;
                            reportError(Diagnostics._0_could_be_instantiated_with_an_arbitrary_type_which_could_be_unrelated_to_1, targetType, generalizedSourceType);
                        }
                    }
                    if (!message) {
                        if (relation === comparableRelation) {
                            message = Diagnostics.Type_0_is_not_comparable_to_type_1;
                        }
                        else if (sourceType === targetType) {
                            message = Diagnostics.Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated;
                        }
                        else if (exactOptionalPropertyTypes && getExactOptionalUnassignableProperties(source2, target2).length) {
                            message = Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties;
                        }
                        else {
                            if (source2.flags & 128 /* StringLiteral */ && target2.flags & 1048576 /* Union */) {
                                const suggestedType = getSuggestedTypeForNonexistentStringLiteralType(source2, target2);
                                if (suggestedType) {
                                    reportError(Diagnostics.Type_0_is_not_assignable_to_type_1_Did_you_mean_2, generalizedSourceType, targetType, typeToString(suggestedType));
                                    return;
                                }
                            }
                            message = Diagnostics.Type_0_is_not_assignable_to_type_1;
                        }
                    }
                    else if (message === Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1 && exactOptionalPropertyTypes && getExactOptionalUnassignableProperties(source2, target2).length) {
                        message = Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties;
                    }
                    reportError(message, generalizedSourceType, targetType);
                }
                function tryElaborateErrorsForPrimitivesAndObjects(source2, target2) {
                    const sourceType = symbolValueDeclarationIsContextSensitive(source2.symbol) ? typeToString(source2, source2.symbol.valueDeclaration) : typeToString(source2);
                    const targetType = symbolValueDeclarationIsContextSensitive(target2.symbol) ? typeToString(target2, target2.symbol.valueDeclaration) : typeToString(target2);
                    if (globalStringType === source2 && stringType === target2 || globalNumberType === source2 && numberType === target2 || globalBooleanType === source2 && booleanType === target2 || getGlobalESSymbolType() === source2 && esSymbolType === target2) {
                        reportError(Diagnostics._0_is_a_primitive_but_1_is_a_wrapper_object_Prefer_using_0_when_possible, targetType, sourceType);
                    }
                }
                function tryElaborateArrayLikeErrors(source2, target2, reportErrors2) {
                    if (isTupleType(source2)) {
                        if (source2.target.readonly && isMutableArrayOrTuple(target2)) {
                            if (reportErrors2) {
                                reportError(Diagnostics.The_type_0_is_readonly_and_cannot_be_assigned_to_the_mutable_type_1, typeToString(source2), typeToString(target2));
                            }
                            return false;
                        }
                        return isArrayOrTupleType(target2);
                    }
                    if (isReadonlyArrayType(source2) && isMutableArrayOrTuple(target2)) {
                        if (reportErrors2) {
                            reportError(Diagnostics.The_type_0_is_readonly_and_cannot_be_assigned_to_the_mutable_type_1, typeToString(source2), typeToString(target2));
                        }
                        return false;
                    }
                    if (isTupleType(target2)) {
                        return isArrayType(source2);
                    }
                    return true;
                }
                function isRelatedToWorker(source2, target2, reportErrors2) {
                    return isRelatedTo(source2, target2, 3 /* Both */, reportErrors2);
                }
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
                function traceUnionsOrIntersectionsTooLarge(source2, target2) {
                    if (!tracing) {
                        return;
                    }
                    if (source2.flags & 3145728 /* UnionOrIntersection */ && target2.flags & 3145728 /* UnionOrIntersection */) {
                        const sourceUnionOrIntersection = source2;
                        const targetUnionOrIntersection = target2;
                        if (sourceUnionOrIntersection.objectFlags & targetUnionOrIntersection.objectFlags & 32768 /* PrimitiveUnion */) {
                            return;
                        }
                        const sourceSize = sourceUnionOrIntersection.types.length;
                        const targetSize = targetUnionOrIntersection.types.length;
                        if (sourceSize * targetSize > 1e6) {
                            tracing.instant(tracing.Phase.CheckTypes, "traceUnionsOrIntersectionsTooLarge_DepthLimit", {
                                sourceId: source2.id,
                                sourceSize,
                                targetId: target2.id,
                                targetSize,
                                pos: errorNode == null ? void 0 : errorNode.pos,
                                end: errorNode == null ? void 0 : errorNode.end
                            });
                        }
                    }
                }
                function getTypeOfPropertyInTypes(types, name) {
                    const appendPropType = (propTypes, type) => {
                        var _a3;
                        type = getApparentType(type);
                        const prop = type.flags & 3145728 /* UnionOrIntersection */ ? getPropertyOfUnionOrIntersectionType(type, name) : getPropertyOfObjectType(type, name);
                        const propType = prop && getTypeOfSymbol(prop) || ((_a3 = getApplicableIndexInfoForName(type, name)) == null ? void 0 : _a3.type) || undefinedType;
                        return append(propTypes, propType);
                    };
                    return getUnionType(reduceLeft(types, appendPropType, 
                    /*initial*/
                    void 0) || emptyArray);
                }
                function hasExcessProperties(source2, target2, reportErrors2) {
                    var _a3;
                    if (!isExcessPropertyCheckTarget(target2) || !noImplicitAny && getObjectFlags(target2) & 4096 /* JSLiteral */) {
                        return false;
                    }
                    const isComparingJsxAttributes = !!(getObjectFlags(source2) & 2048 /* JsxAttributes */);
                    if ((relation === assignableRelation || relation === comparableRelation) && (isTypeSubsetOf(globalObjectType, target2) || !isComparingJsxAttributes && isEmptyObjectType(target2))) {
                        return false;
                    }
                    let reducedTarget = target2;
                    let checkTypes;
                    if (target2.flags & 1048576 /* Union */) {
                        reducedTarget = findMatchingDiscriminantType(source2, target2, isRelatedTo) || filterPrimitivesIfContainsNonPrimitive(target2);
                        checkTypes = reducedTarget.flags & 1048576 /* Union */ ? reducedTarget.types : [reducedTarget];
                    }
                    for (const prop of getPropertiesOfType(source2)) {
                        if (shouldCheckAsExcessProperty(prop, source2.symbol) && !isIgnoredJsxProperty(source2, prop)) {
                            if (!isKnownProperty(reducedTarget, prop.escapedName, isComparingJsxAttributes)) {
                                if (reportErrors2) {
                                    const errorTarget = filterType(reducedTarget, isExcessPropertyCheckTarget);
                                    if (!errorNode)
                                        return Debug.fail();
                                    if (isJsxAttributes(errorNode) || isJsxOpeningLikeElement(errorNode) || isJsxOpeningLikeElement(errorNode.parent)) {
                                        if (prop.valueDeclaration && isJsxAttribute(prop.valueDeclaration) && getSourceFileOfNode(errorNode) === getSourceFileOfNode(prop.valueDeclaration.name)) {
                                            errorNode = prop.valueDeclaration.name;
                                        }
                                        const propName = symbolToString(prop);
                                        const suggestionSymbol = getSuggestedSymbolForNonexistentJSXAttribute(propName, errorTarget);
                                        const suggestion = suggestionSymbol ? symbolToString(suggestionSymbol) : void 0;
                                        if (suggestion) {
                                            reportError(Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2, propName, typeToString(errorTarget), suggestion);
                                        }
                                        else {
                                            reportError(Diagnostics.Property_0_does_not_exist_on_type_1, propName, typeToString(errorTarget));
                                        }
                                    }
                                    else {
                                        const objectLiteralDeclaration = ((_a3 = source2.symbol) == null ? void 0 : _a3.declarations) && firstOrUndefined(source2.symbol.declarations);
                                        let suggestion;
                                        if (prop.valueDeclaration && findAncestor(prop.valueDeclaration, (d) => d === objectLiteralDeclaration) && getSourceFileOfNode(objectLiteralDeclaration) === getSourceFileOfNode(errorNode)) {
                                            const propDeclaration = prop.valueDeclaration;
                                            Debug.assertNode(propDeclaration, isObjectLiteralElementLike);
                                            errorNode = propDeclaration;
                                            const name = propDeclaration.name;
                                            if (isIdentifier(name)) {
                                                suggestion = getSuggestionForNonexistentProperty(name, errorTarget);
                                            }
                                        }
                                        if (suggestion !== void 0) {
                                            reportError(Diagnostics.Object_literal_may_only_specify_known_properties_but_0_does_not_exist_in_type_1_Did_you_mean_to_write_2, symbolToString(prop), typeToString(errorTarget), suggestion);
                                        }
                                        else {
                                            reportError(Diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1, symbolToString(prop), typeToString(errorTarget));
                                        }
                                    }
                                }
                                return true;
                            }
                            if (checkTypes && !isRelatedTo(getTypeOfSymbol(prop), getTypeOfPropertyInTypes(checkTypes, prop.escapedName), 3 /* Both */, reportErrors2)) {
                                if (reportErrors2) {
                                    reportIncompatibleError(Diagnostics.Types_of_property_0_are_incompatible, symbolToString(prop));
                                }
                                return true;
                            }
                        }
                    }
                    return false;
                }
                function shouldCheckAsExcessProperty(prop, container) {
                    return prop.valueDeclaration && container.valueDeclaration && prop.valueDeclaration.parent === container.valueDeclaration;
                }
                function unionOrIntersectionRelatedTo(source2, target2, reportErrors2, intersectionState) {
                    if (source2.flags & 1048576 /* Union */) {
                        return relation === comparableRelation ? someTypeRelatedToType(source2, target2, reportErrors2 && !(source2.flags & 134348796 /* Primitive */), intersectionState) : eachTypeRelatedToType(source2, target2, reportErrors2 && !(source2.flags & 134348796 /* Primitive */), intersectionState);
                    }
                    if (target2.flags & 1048576 /* Union */) {
                        return typeRelatedToSomeType(getRegularTypeOfObjectLiteral(source2), target2, reportErrors2 && !(source2.flags & 134348796 /* Primitive */) && !(target2.flags & 134348796 /* Primitive */));
                    }
                    if (target2.flags & 2097152 /* Intersection */) {
                        return typeRelatedToEachType(source2, target2, reportErrors2, 2 /* Target */);
                    }
                    if (relation === comparableRelation && target2.flags & 134348796 /* Primitive */) {
                        const constraints = sameMap(source2.types, (t) => t.flags & 465829888 /* Instantiable */ ? getBaseConstraintOfType(t) || unknownType : t);
                        if (constraints !== source2.types) {
                            source2 = getIntersectionType(constraints);
                            if (source2.flags & 131072 /* Never */) {
                                return 0 /* False */;
                            }
                            if (!(source2.flags & 2097152 /* Intersection */)) {
                                return isRelatedTo(source2, target2, 1 /* Source */, 
                                /*reportErrors*/
                                false) || isRelatedTo(target2, source2, 1 /* Source */, 
                                /*reportErrors*/
                                false);
                            }
                        }
                    }
                    return someTypeRelatedToType(source2, target2, 
                    /*reportErrors*/
                    false, 1 /* Source */);
                }
                function eachTypeRelatedToSomeType(source2, target2) {
                    let result2 = -1 /* True */;
                    const sourceTypes = source2.types;
                    for (const sourceType of sourceTypes) {
                        const related = typeRelatedToSomeType(sourceType, target2, 
                        /*reportErrors*/
                        false);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }
                function typeRelatedToSomeType(source2, target2, reportErrors2) {
                    const targetTypes = target2.types;
                    if (target2.flags & 1048576 /* Union */) {
                        if (containsType(targetTypes, source2)) {
                            return -1 /* True */;
                        }
                        const match = getMatchingUnionConstituentForType(target2, source2);
                        if (match) {
                            const related = isRelatedTo(source2, match, 2 /* Target */, 
                            /*reportErrors*/
                            false);
                            if (related) {
                                return related;
                            }
                        }
                    }
                    for (const type of targetTypes) {
                        const related = isRelatedTo(source2, type, 2 /* Target */, 
                        /*reportErrors*/
                        false);
                        if (related) {
                            return related;
                        }
                    }
                    if (reportErrors2) {
                        const bestMatchingType = getBestMatchingType(source2, target2, isRelatedTo);
                        if (bestMatchingType) {
                            isRelatedTo(source2, bestMatchingType, 2 /* Target */, 
                            /*reportErrors*/
                            true);
                        }
                    }
                    return 0 /* False */;
                }
                function typeRelatedToEachType(source2, target2, reportErrors2, intersectionState) {
                    let result2 = -1 /* True */;
                    const targetTypes = target2.types;
                    for (const targetType of targetTypes) {
                        const related = isRelatedTo(source2, targetType, 2 /* Target */, reportErrors2, 
                        /*headMessage*/
                        void 0, intersectionState);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }
                function someTypeRelatedToType(source2, target2, reportErrors2, intersectionState) {
                    const sourceTypes = source2.types;
                    if (source2.flags & 1048576 /* Union */ && containsType(sourceTypes, target2)) {
                        return -1 /* True */;
                    }
                    const len = sourceTypes.length;
                    for (let i = 0; i < len; i++) {
                        const related = isRelatedTo(sourceTypes[i], target2, 1 /* Source */, reportErrors2 && i === len - 1, 
                        /*headMessage*/
                        void 0, intersectionState);
                        if (related) {
                            return related;
                        }
                    }
                    return 0 /* False */;
                }
                function getUndefinedStrippedTargetIfNeeded(source2, target2) {
                    if (source2.flags & 1048576 /* Union */ && target2.flags & 1048576 /* Union */ && !(source2.types[0].flags & 32768 /* Undefined */) && target2.types[0].flags & 32768 /* Undefined */) {
                        return extractTypesOfKind(target2, ~32768 /* Undefined */);
                    }
                    return target2;
                }
                function eachTypeRelatedToType(source2, target2, reportErrors2, intersectionState) {
                    let result2 = -1 /* True */;
                    const sourceTypes = source2.types;
                    const undefinedStrippedTarget = getUndefinedStrippedTargetIfNeeded(source2, target2);
                    for (let i = 0; i < sourceTypes.length; i++) {
                        const sourceType = sourceTypes[i];
                        if (undefinedStrippedTarget.flags & 1048576 /* Union */ && sourceTypes.length >= undefinedStrippedTarget.types.length && sourceTypes.length % undefinedStrippedTarget.types.length === 0) {
                            const related2 = isRelatedTo(sourceType, undefinedStrippedTarget.types[i % undefinedStrippedTarget.types.length], 3 /* Both */, 
                            /*reportErrors*/
                            false, 
                            /*headMessage*/
                            void 0, intersectionState);
                            if (related2) {
                                result2 &= related2;
                                continue;
                            }
                        }
                        const related = isRelatedTo(sourceType, target2, 1 /* Source */, reportErrors2, 
                        /*headMessage*/
                        void 0, intersectionState);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }
                function typeArgumentsRelatedTo(sources = emptyArray, targets = emptyArray, variances = emptyArray, reportErrors2, intersectionState) {
                    if (sources.length !== targets.length && relation === identityRelation) {
                        return 0 /* False */;
                    }
                    const length2 = sources.length <= targets.length ? sources.length : targets.length;
                    let result2 = -1 /* True */;
                    for (let i = 0; i < length2; i++) {
                        const varianceFlags = i < variances.length ? variances[i] : 1 /* Covariant */;
                        const variance = varianceFlags & 7 /* VarianceMask */;
                        if (variance !== 4 /* Independent */) {
                            const s = sources[i];
                            const t = targets[i];
                            let related = -1 /* True */;
                            if (varianceFlags & 8 /* Unmeasurable */) {
                                related = relation === identityRelation ? isRelatedTo(s, t, 3 /* Both */, 
                                /*reportErrors*/
                                false) : compareTypesIdentical(s, t);
                            }
                            else if (variance === 1 /* Covariant */) {
                                related = isRelatedTo(s, t, 3 /* Both */, reportErrors2, 
                                /*headMessage*/
                                void 0, intersectionState);
                            }
                            else if (variance === 2 /* Contravariant */) {
                                related = isRelatedTo(t, s, 3 /* Both */, reportErrors2, 
                                /*headMessage*/
                                void 0, intersectionState);
                            }
                            else if (variance === 3 /* Bivariant */) {
                                related = isRelatedTo(t, s, 3 /* Both */, 
                                /*reportErrors*/
                                false);
                                if (!related) {
                                    related = isRelatedTo(s, t, 3 /* Both */, reportErrors2, 
                                    /*headMessage*/
                                    void 0, intersectionState);
                                }
                            }
                            else {
                                related = isRelatedTo(s, t, 3 /* Both */, reportErrors2, 
                                /*headMessage*/
                                void 0, intersectionState);
                                if (related) {
                                    related &= isRelatedTo(t, s, 3 /* Both */, reportErrors2, 
                                    /*headMessage*/
                                    void 0, intersectionState);
                                }
                            }
                            if (!related) {
                                return 0 /* False */;
                            }
                            result2 &= related;
                        }
                    }
                    return result2;
                }
                function recursiveTypeRelatedTo(source2, target2, reportErrors2, intersectionState, recursionFlags) {
                    var _a3, _b, _c;
                    if (overflow) {
                        return 0 /* False */;
                    }
                    const id = getRelationKey(source2, target2, intersectionState, relation, 
                    /*ingnoreConstraints*/
                    false);
                    const entry = relation.get(id);
                    if (entry !== void 0) {
                        if (reportErrors2 && entry & 2 /* Failed */ && !(entry & 4 /* Reported */)) {
                        }
                        else {
                            if (outofbandVarianceMarkerHandler) {
                                const saved = entry & 24 /* ReportsMask */;
                                if (saved & 8 /* ReportsUnmeasurable */) {
                                    instantiateType(source2, reportUnmeasurableMapper);
                                }
                                if (saved & 16 /* ReportsUnreliable */) {
                                    instantiateType(source2, reportUnreliableMapper);
                                }
                            }
                            return entry & 1 /* Succeeded */ ? -1 /* True */ : 0 /* False */;
                        }
                    }
                    if (!maybeKeys) {
                        maybeKeys = [];
                        sourceStack = [];
                        targetStack = [];
                    }
                    else {
                        const broadestEquivalentId = id.startsWith("*") ? getRelationKey(source2, target2, intersectionState, relation, 
                        /*ignoreConstraints*/
                        true) : void 0;
                        for (let i = 0; i < maybeCount; i++) {
                            if (id === maybeKeys[i] || broadestEquivalentId && broadestEquivalentId === maybeKeys[i]) {
                                return 3 /* Maybe */;
                            }
                        }
                        if (sourceDepth === 100 || targetDepth === 100) {
                            overflow = true;
                            return 0 /* False */;
                        }
                    }
                    const maybeStart = maybeCount;
                    maybeKeys[maybeCount] = id;
                    maybeCount++;
                    const saveExpandingFlags = expandingFlags;
                    if (recursionFlags & 1 /* Source */) {
                        sourceStack[sourceDepth] = source2;
                        sourceDepth++;
                        if (!(expandingFlags & 1 /* Source */) && isDeeplyNestedType(source2, sourceStack, sourceDepth))
                            expandingFlags |= 1 /* Source */;
                    }
                    if (recursionFlags & 2 /* Target */) {
                        targetStack[targetDepth] = target2;
                        targetDepth++;
                        if (!(expandingFlags & 2 /* Target */) && isDeeplyNestedType(target2, targetStack, targetDepth))
                            expandingFlags |= 2 /* Target */;
                    }
                    let originalHandler;
                    let propagatingVarianceFlags = 0;
                    if (outofbandVarianceMarkerHandler) {
                        originalHandler = outofbandVarianceMarkerHandler;
                        outofbandVarianceMarkerHandler = (onlyUnreliable) => {
                            propagatingVarianceFlags |= onlyUnreliable ? 16 /* ReportsUnreliable */ : 8 /* ReportsUnmeasurable */;
                            return originalHandler(onlyUnreliable);
                        };
                    }
                    let result2;
                    if (expandingFlags === 3 /* Both */) {
                        (_a3 = tracing) == null ? void 0 : _a3.instant(tracing.Phase.CheckTypes, "recursiveTypeRelatedTo_DepthLimit", {
                            sourceId: source2.id,
                            sourceIdStack: sourceStack.map((t) => t.id),
                            targetId: target2.id,
                            targetIdStack: targetStack.map((t) => t.id),
                            depth: sourceDepth,
                            targetDepth
                        });
                        result2 = 3 /* Maybe */;
                    }
                    else {
                        (_b = tracing) == null ? void 0 : _b.push(tracing.Phase.CheckTypes, "structuredTypeRelatedTo", { sourceId: source2.id, targetId: target2.id });
                        result2 = structuredTypeRelatedTo(source2, target2, reportErrors2, intersectionState);
                        (_c = tracing) == null ? void 0 : _c.pop();
                    }
                    if (outofbandVarianceMarkerHandler) {
                        outofbandVarianceMarkerHandler = originalHandler;
                    }
                    if (recursionFlags & 1 /* Source */) {
                        sourceDepth--;
                    }
                    if (recursionFlags & 2 /* Target */) {
                        targetDepth--;
                    }
                    expandingFlags = saveExpandingFlags;
                    if (result2) {
                        if (result2 === -1 /* True */ || sourceDepth === 0 && targetDepth === 0) {
                            if (result2 === -1 /* True */ || result2 === 3 /* Maybe */) {
                                for (let i = maybeStart; i < maybeCount; i++) {
                                    relation.set(maybeKeys[i], 1 /* Succeeded */ | propagatingVarianceFlags);
                                }
                            }
                            maybeCount = maybeStart;
                        }
                    }
                    else {
                        relation.set(id, (reportErrors2 ? 4 /* Reported */ : 0) | 2 /* Failed */ | propagatingVarianceFlags);
                        maybeCount = maybeStart;
                    }
                    return result2;
                }
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
                function structuredTypeRelatedToWorker(source2, target2, reportErrors2, intersectionState, saveErrorInfo) {
                    let result2;
                    let originalErrorInfo;
                    let varianceCheckFailed = false;
                    let sourceFlags = source2.flags;
                    const targetFlags = target2.flags;
                    if (relation === identityRelation) {
                        if (sourceFlags & 3145728 /* UnionOrIntersection */) {
                            let result3 = eachTypeRelatedToSomeType(source2, target2);
                            if (result3) {
                                result3 &= eachTypeRelatedToSomeType(target2, source2);
                            }
                            return result3;
                        }
                        if (sourceFlags & 4194304 /* Index */) {
                            return isRelatedTo(source2.type, target2.type, 3 /* Both */, 
                            /*reportErrors*/
                            false);
                        }
                        if (sourceFlags & 8388608 /* IndexedAccess */) {
                            if (result2 = isRelatedTo(source2.objectType, target2.objectType, 3 /* Both */, 
                            /*reportErrors*/
                            false)) {
                                if (result2 &= isRelatedTo(source2.indexType, target2.indexType, 3 /* Both */, 
                                /*reportErrors*/
                                false)) {
                                    return result2;
                                }
                            }
                        }
                        if (sourceFlags & 16777216 /* Conditional */) {
                            if (source2.root.isDistributive === target2.root.isDistributive) {
                                if (result2 = isRelatedTo(source2.checkType, target2.checkType, 3 /* Both */, 
                                /*reportErrors*/
                                false)) {
                                    if (result2 &= isRelatedTo(source2.extendsType, target2.extendsType, 3 /* Both */, 
                                    /*reportErrors*/
                                    false)) {
                                        if (result2 &= isRelatedTo(getTrueTypeFromConditionalType(source2), getTrueTypeFromConditionalType(target2), 3 /* Both */, 
                                        /*reportErrors*/
                                        false)) {
                                            if (result2 &= isRelatedTo(getFalseTypeFromConditionalType(source2), getFalseTypeFromConditionalType(target2), 3 /* Both */, 
                                            /*reportErrors*/
                                            false)) {
                                                return result2;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (sourceFlags & 33554432 /* Substitution */) {
                            if (result2 = isRelatedTo(source2.baseType, target2.baseType, 3 /* Both */, 
                            /*reportErrors*/
                            false)) {
                                if (result2 &= isRelatedTo(source2.constraint, target2.constraint, 3 /* Both */, 
                                /*reportErrors*/
                                false)) {
                                    return result2;
                                }
                            }
                        }
                        if (!(sourceFlags & 524288 /* Object */)) {
                            return 0 /* False */;
                        }
                    }
                    else if (sourceFlags & 3145728 /* UnionOrIntersection */ || targetFlags & 3145728 /* UnionOrIntersection */) {
                        if (result2 = unionOrIntersectionRelatedTo(source2, target2, reportErrors2, intersectionState)) {
                            return result2;
                        }
                        if (!(sourceFlags & 465829888 /* Instantiable */ || sourceFlags & 524288 /* Object */ && targetFlags & 1048576 /* Union */ || sourceFlags & 2097152 /* Intersection */ && targetFlags & (524288 /* Object */ | 1048576 /* Union */ | 465829888 /* Instantiable */))) {
                            return 0 /* False */;
                        }
                    }
                    if (sourceFlags & (524288 /* Object */ | 16777216 /* Conditional */) && source2.aliasSymbol && source2.aliasTypeArguments && source2.aliasSymbol === target2.aliasSymbol && !(isMarkerType(source2) || isMarkerType(target2))) {
                        const variances = getAliasVariances(source2.aliasSymbol);
                        if (variances === emptyArray) {
                            return 1 /* Unknown */;
                        }
                        const params = getSymbolLinks(source2.aliasSymbol).typeParameters;
                        const minParams = getMinTypeArgumentCount(params);
                        const sourceTypes = fillMissingTypeArguments(source2.aliasTypeArguments, params, minParams, isInJSFile(source2.aliasSymbol.valueDeclaration));
                        const targetTypes = fillMissingTypeArguments(target2.aliasTypeArguments, params, minParams, isInJSFile(source2.aliasSymbol.valueDeclaration));
                        const varianceResult = relateVariances(sourceTypes, targetTypes, variances, intersectionState);
                        if (varianceResult !== void 0) {
                            return varianceResult;
                        }
                    }
                    if (isSingleElementGenericTupleType(source2) && !source2.target.readonly && (result2 = isRelatedTo(getTypeArguments(source2)[0], target2, 1 /* Source */)) || isSingleElementGenericTupleType(target2) && (target2.target.readonly || isMutableArrayOrTuple(getBaseConstraintOfType(source2) || source2)) && (result2 = isRelatedTo(source2, getTypeArguments(target2)[0], 2 /* Target */))) {
                        return result2;
                    }
                    if (targetFlags & 262144 /* TypeParameter */) {
                        if (getObjectFlags(source2) & 32 /* Mapped */ && !source2.declaration.nameType && isRelatedTo(getIndexType(target2), getConstraintTypeFromMappedType(source2), 3 /* Both */)) {
                            if (!(getMappedTypeModifiers(source2) & 4 /* IncludeOptional */)) {
                                const templateType = getTemplateTypeFromMappedType(source2);
                                const indexedAccessType = getIndexedAccessType(target2, getTypeParameterFromMappedType(source2));
                                if (result2 = isRelatedTo(templateType, indexedAccessType, 3 /* Both */, reportErrors2)) {
                                    return result2;
                                }
                            }
                        }
                        if (relation === comparableRelation && sourceFlags & 262144 /* TypeParameter */) {
                            let constraint = getConstraintOfTypeParameter(source2);
                            if (constraint && hasNonCircularBaseConstraint(source2)) {
                                while (constraint && someType(constraint, (c) => !!(c.flags & 262144 /* TypeParameter */))) {
                                    if (result2 = isRelatedTo(constraint, target2, 1 /* Source */, 
                                    /*reportErrors*/
                                    false)) {
                                        return result2;
                                    }
                                    constraint = getConstraintOfTypeParameter(constraint);
                                }
                            }
                            return 0 /* False */;
                        }
                    }
                    else if (targetFlags & 4194304 /* Index */) {
                        const targetType = target2.type;
                        if (sourceFlags & 4194304 /* Index */) {
                            if (result2 = isRelatedTo(targetType, source2.type, 3 /* Both */, 
                            /*reportErrors*/
                            false)) {
                                return result2;
                            }
                        }
                        if (isTupleType(targetType)) {
                            if (result2 = isRelatedTo(source2, getKnownKeysOfTupleType(targetType), 2 /* Target */, reportErrors2)) {
                                return result2;
                            }
                        }
                        else {
                            const constraint = getSimplifiedTypeOrConstraint(targetType);
                            if (constraint) {
                                if (isRelatedTo(source2, getIndexType(constraint, target2.stringsOnly), 2 /* Target */, reportErrors2) === -1 /* True */) {
                                    return -1 /* True */;
                                }
                            }
                            else if (isGenericMappedType(targetType)) {
                                const nameType = getNameTypeFromMappedType(targetType);
                                const constraintType = getConstraintTypeFromMappedType(targetType);
                                let targetKeys;
                                if (nameType && isMappedTypeWithKeyofConstraintDeclaration(targetType)) {
                                    const modifiersType = getApparentType(getModifiersTypeFromMappedType(targetType));
                                    const mappedKeys = [];
                                    forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType(modifiersType, 8576 /* StringOrNumberLiteralOrUnique */, 
                                    /*stringsOnly*/
                                    false, (t) => void mappedKeys.push(instantiateType(nameType, appendTypeMapping(targetType.mapper, getTypeParameterFromMappedType(targetType), t))));
                                    targetKeys = getUnionType([...mappedKeys, nameType]);
                                }
                                else {
                                    targetKeys = nameType || constraintType;
                                }
                                if (isRelatedTo(source2, targetKeys, 2 /* Target */, reportErrors2) === -1 /* True */) {
                                    return -1 /* True */;
                                }
                            }
                        }
                    }
                    else if (targetFlags & 8388608 /* IndexedAccess */) {
                        if (sourceFlags & 8388608 /* IndexedAccess */) {
                            if (result2 = isRelatedTo(source2.objectType, target2.objectType, 3 /* Both */, reportErrors2)) {
                                result2 &= isRelatedTo(source2.indexType, target2.indexType, 3 /* Both */, reportErrors2);
                            }
                            if (result2) {
                                return result2;
                            }
                            if (reportErrors2) {
                                originalErrorInfo = errorInfo;
                            }
                        }
                        if (relation === assignableRelation || relation === comparableRelation) {
                            const objectType = target2.objectType;
                            const indexType = target2.indexType;
                            const baseObjectType = getBaseConstraintOfType(objectType) || objectType;
                            const baseIndexType = getBaseConstraintOfType(indexType) || indexType;
                            if (!isGenericObjectType(baseObjectType) && !isGenericIndexType(baseIndexType)) {
                                const accessFlags = 4 /* Writing */ | (baseObjectType !== objectType ? 2 /* NoIndexSignatures */ : 0);
                                const constraint = getIndexedAccessTypeOrUndefined(baseObjectType, baseIndexType, accessFlags);
                                if (constraint) {
                                    if (reportErrors2 && originalErrorInfo) {
                                        resetErrorInfo(saveErrorInfo);
                                    }
                                    if (result2 = isRelatedTo(source2, constraint, 2 /* Target */, reportErrors2, 
                                    /* headMessage */
                                    void 0, intersectionState)) {
                                        return result2;
                                    }
                                    if (reportErrors2 && originalErrorInfo && errorInfo) {
                                        errorInfo = countMessageChainBreadth([originalErrorInfo]) <= countMessageChainBreadth([errorInfo]) ? originalErrorInfo : errorInfo;
                                    }
                                }
                            }
                        }
                        if (reportErrors2) {
                            originalErrorInfo = void 0;
                        }
                    }
                    else if (isGenericMappedType(target2) && relation !== identityRelation) {
                        const keysRemapped = !!target2.declaration.nameType;
                        const templateType = getTemplateTypeFromMappedType(target2);
                        const modifiers = getMappedTypeModifiers(target2);
                        if (!(modifiers & 8 /* ExcludeOptional */)) {
                            if (!keysRemapped && templateType.flags & 8388608 /* IndexedAccess */ && templateType.objectType === source2 && templateType.indexType === getTypeParameterFromMappedType(target2)) {
                                return -1 /* True */;
                            }
                            if (!isGenericMappedType(source2)) {
                                const targetKeys = keysRemapped ? getNameTypeFromMappedType(target2) : getConstraintTypeFromMappedType(target2);
                                const sourceKeys = getIndexType(source2, 
                                /*stringsOnly*/
                                void 0, 
                                /*noIndexSignatures*/
                                true);
                                const includeOptional = modifiers & 4 /* IncludeOptional */;
                                const filteredByApplicability = includeOptional ? intersectTypes(targetKeys, sourceKeys) : void 0;
                                if (includeOptional ? !(filteredByApplicability.flags & 131072 /* Never */) : isRelatedTo(targetKeys, sourceKeys, 3 /* Both */)) {
                                    const templateType2 = getTemplateTypeFromMappedType(target2);
                                    const typeParameter = getTypeParameterFromMappedType(target2);
                                    const nonNullComponent = extractTypesOfKind(templateType2, ~98304 /* Nullable */);
                                    if (!keysRemapped && nonNullComponent.flags & 8388608 /* IndexedAccess */ && nonNullComponent.indexType === typeParameter) {
                                        if (result2 = isRelatedTo(source2, nonNullComponent.objectType, 2 /* Target */, reportErrors2)) {
                                            return result2;
                                        }
                                    }
                                    else {
                                        const indexingType = keysRemapped ? filteredByApplicability || targetKeys : filteredByApplicability ? getIntersectionType([filteredByApplicability, typeParameter]) : typeParameter;
                                        const indexedAccessType = getIndexedAccessType(source2, indexingType);
                                        if (result2 = isRelatedTo(indexedAccessType, templateType2, 3 /* Both */, reportErrors2)) {
                                            return result2;
                                        }
                                    }
                                }
                                originalErrorInfo = errorInfo;
                                resetErrorInfo(saveErrorInfo);
                            }
                        }
                    }
                    else if (targetFlags & 16777216 /* Conditional */) {
                        if (isDeeplyNestedType(target2, targetStack, targetDepth, 10)) {
                            return 3 /* Maybe */;
                        }
                        const c = target2;
                        if (!c.root.inferTypeParameters && !isDistributionDependent(c.root)) {
                            const skipTrue = !isTypeAssignableTo(getPermissiveInstantiation(c.checkType), getPermissiveInstantiation(c.extendsType));
                            const skipFalse = !skipTrue && isTypeAssignableTo(getRestrictiveInstantiation(c.checkType), getRestrictiveInstantiation(c.extendsType));
                            if (result2 = skipTrue ? -1 /* True */ : isRelatedTo(source2, getTrueTypeFromConditionalType(c), 2 /* Target */, 
                            /*reportErrors*/
                            false, 
                            /*headMessage*/
                            void 0, intersectionState)) {
                                result2 &= skipFalse ? -1 /* True */ : isRelatedTo(source2, getFalseTypeFromConditionalType(c), 2 /* Target */, 
                                /*reportErrors*/
                                false, 
                                /*headMessage*/
                                void 0, intersectionState);
                                if (result2) {
                                    return result2;
                                }
                            }
                        }
                    }
                    else if (targetFlags & 134217728 /* TemplateLiteral */) {
                        if (sourceFlags & 134217728 /* TemplateLiteral */) {
                            if (relation === comparableRelation) {
                                return templateLiteralTypesDefinitelyUnrelated(source2, target2) ? 0 /* False */ : -1 /* True */;
                            }
                            instantiateType(source2, reportUnreliableMapper);
                        }
                        if (isTypeMatchedByTemplateLiteralType(source2, target2)) {
                            return -1 /* True */;
                        }
                    }
                    else if (target2.flags & 268435456 /* StringMapping */) {
                        if (!(source2.flags & 268435456 /* StringMapping */)) {
                            if (isMemberOfStringMapping(source2, target2)) {
                                return -1 /* True */;
                            }
                        }
                    }
                    if (sourceFlags & 8650752 /* TypeVariable */) {
                        if (!(sourceFlags & 8388608 /* IndexedAccess */ && targetFlags & 8388608 /* IndexedAccess */)) {
                            const constraint = getConstraintOfType(source2) || unknownType;
                            if (result2 = isRelatedTo(constraint, target2, 1 /* Source */, 
                            /*reportErrors*/
                            false, 
                            /*headMessage*/
                            void 0, intersectionState)) {
                                return result2;
                            }
                            else if (result2 = isRelatedTo(getTypeWithThisArgument(constraint, source2), target2, 1 /* Source */, reportErrors2 && constraint !== unknownType && !(targetFlags & sourceFlags & 262144 /* TypeParameter */), 
                            /*headMessage*/
                            void 0, intersectionState)) {
                                return result2;
                            }
                            if (isMappedTypeGenericIndexedAccess(source2)) {
                                const indexConstraint = getConstraintOfType(source2.indexType);
                                if (indexConstraint) {
                                    if (result2 = isRelatedTo(getIndexedAccessType(source2.objectType, indexConstraint), target2, 1 /* Source */, reportErrors2)) {
                                        return result2;
                                    }
                                }
                            }
                        }
                    }
                    else if (sourceFlags & 4194304 /* Index */) {
                        if (result2 = isRelatedTo(keyofConstraintType, target2, 1 /* Source */, reportErrors2)) {
                            return result2;
                        }
                    }
                    else if (sourceFlags & 134217728 /* TemplateLiteral */ && !(targetFlags & 524288 /* Object */)) {
                        if (!(targetFlags & 134217728 /* TemplateLiteral */)) {
                            const constraint = getBaseConstraintOfType(source2);
                            if (constraint && constraint !== source2 && (result2 = isRelatedTo(constraint, target2, 1 /* Source */, reportErrors2))) {
                                return result2;
                            }
                        }
                    }
                    else if (sourceFlags & 268435456 /* StringMapping */) {
                        if (targetFlags & 268435456 /* StringMapping */) {
                            if (source2.symbol !== target2.symbol) {
                                return 0 /* False */;
                            }
                            if (result2 = isRelatedTo(source2.type, target2.type, 3 /* Both */, reportErrors2)) {
                                return result2;
                            }
                        }
                        else {
                            const constraint = getBaseConstraintOfType(source2);
                            if (constraint && (result2 = isRelatedTo(constraint, target2, 1 /* Source */, reportErrors2))) {
                                return result2;
                            }
                        }
                    }
                    else if (sourceFlags & 16777216 /* Conditional */) {
                        if (isDeeplyNestedType(source2, sourceStack, sourceDepth, 10)) {
                            return 3 /* Maybe */;
                        }
                        if (targetFlags & 16777216 /* Conditional */) {
                            const sourceParams = source2.root.inferTypeParameters;
                            let sourceExtends = source2.extendsType;
                            let mapper;
                            if (sourceParams) {
                                const ctx = createInferenceContext(sourceParams, 
                                /*signature*/
                                void 0, 0 /* None */, isRelatedToWorker);
                                inferTypes(ctx.inferences, target2.extendsType, sourceExtends, 512 /* NoConstraints */ | 1024 /* AlwaysStrict */);
                                sourceExtends = instantiateType(sourceExtends, ctx.mapper);
                                mapper = ctx.mapper;
                            }
                            if (isTypeIdenticalTo(sourceExtends, target2.extendsType) && (isRelatedTo(source2.checkType, target2.checkType, 3 /* Both */) || isRelatedTo(target2.checkType, source2.checkType, 3 /* Both */))) {
                                if (result2 = isRelatedTo(instantiateType(getTrueTypeFromConditionalType(source2), mapper), getTrueTypeFromConditionalType(target2), 3 /* Both */, reportErrors2)) {
                                    result2 &= isRelatedTo(getFalseTypeFromConditionalType(source2), getFalseTypeFromConditionalType(target2), 3 /* Both */, reportErrors2);
                                }
                                if (result2) {
                                    return result2;
                                }
                            }
                        }
                        else {
                            const distributiveConstraint = hasNonCircularBaseConstraint(source2) ? getConstraintOfDistributiveConditionalType(source2) : void 0;
                            if (distributiveConstraint) {
                                if (result2 = isRelatedTo(distributiveConstraint, target2, 1 /* Source */, reportErrors2)) {
                                    return result2;
                                }
                            }
                        }
                        const defaultConstraint = getDefaultConstraintOfConditionalType(source2);
                        if (defaultConstraint) {
                            if (result2 = isRelatedTo(defaultConstraint, target2, 1 /* Source */, reportErrors2)) {
                                return result2;
                            }
                        }
                    }
                    else {
                        if (relation !== subtypeRelation && relation !== strictSubtypeRelation && isPartialMappedType(target2) && isEmptyObjectType(source2)) {
                            return -1 /* True */;
                        }
                        if (isGenericMappedType(target2)) {
                            if (isGenericMappedType(source2)) {
                                if (result2 = mappedTypeRelatedTo(source2, target2, reportErrors2)) {
                                    return result2;
                                }
                            }
                            return 0 /* False */;
                        }
                        const sourceIsPrimitive = !!(sourceFlags & 134348796 /* Primitive */);
                        if (relation !== identityRelation) {
                            source2 = getApparentType(source2);
                            sourceFlags = source2.flags;
                        }
                        else if (isGenericMappedType(source2)) {
                            return 0 /* False */;
                        }
                        if (getObjectFlags(source2) & 4 /* Reference */ && getObjectFlags(target2) & 4 /* Reference */ && source2.target === target2.target && !isTupleType(source2) && !(isMarkerType(source2) || isMarkerType(target2))) {
                            if (isEmptyArrayLiteralType(source2)) {
                                return -1 /* True */;
                            }
                            const variances = getVariances(source2.target);
                            if (variances === emptyArray) {
                                return 1 /* Unknown */;
                            }
                            const varianceResult = relateVariances(getTypeArguments(source2), getTypeArguments(target2), variances, intersectionState);
                            if (varianceResult !== void 0) {
                                return varianceResult;
                            }
                        }
                        else if (isReadonlyArrayType(target2) ? isArrayOrTupleType(source2) : isArrayType(target2) && isTupleType(source2) && !source2.target.readonly) {
                            if (relation !== identityRelation) {
                                return isRelatedTo(getIndexTypeOfType(source2, numberType) || anyType, getIndexTypeOfType(target2, numberType) || anyType, 3 /* Both */, reportErrors2);
                            }
                            else {
                                return 0 /* False */;
                            }
                        }
                        else if ((relation === subtypeRelation || relation === strictSubtypeRelation) && isEmptyObjectType(target2) && getObjectFlags(target2) & 8192 /* FreshLiteral */ && !isEmptyObjectType(source2)) {
                            return 0 /* False */;
                        }
                        if (sourceFlags & (524288 /* Object */ | 2097152 /* Intersection */) && targetFlags & 524288 /* Object */) {
                            const reportStructuralErrors = reportErrors2 && errorInfo === saveErrorInfo.errorInfo && !sourceIsPrimitive;
                            result2 = propertiesRelatedTo(source2, target2, reportStructuralErrors, 
                            /*excludedProperties*/
                            void 0, 
                            /*optionalsOnly*/
                            false, intersectionState);
                            if (result2) {
                                result2 &= signaturesRelatedTo(source2, target2, 0 /* Call */, reportStructuralErrors, intersectionState);
                                if (result2) {
                                    result2 &= signaturesRelatedTo(source2, target2, 1 /* Construct */, reportStructuralErrors, intersectionState);
                                    if (result2) {
                                        result2 &= indexSignaturesRelatedTo(source2, target2, sourceIsPrimitive, reportStructuralErrors, intersectionState);
                                    }
                                }
                            }
                            if (varianceCheckFailed && result2) {
                                errorInfo = originalErrorInfo || errorInfo || saveErrorInfo.errorInfo;
                            }
                            else if (result2) {
                                return result2;
                            }
                        }
                        if (sourceFlags & (524288 /* Object */ | 2097152 /* Intersection */) && targetFlags & 1048576 /* Union */) {
                            const objectOnlyTarget = extractTypesOfKind(target2, 524288 /* Object */ | 2097152 /* Intersection */ | 33554432 /* Substitution */);
                            if (objectOnlyTarget.flags & 1048576 /* Union */) {
                                const result3 = typeRelatedToDiscriminatedType(source2, objectOnlyTarget);
                                if (result3) {
                                    return result3;
                                }
                            }
                        }
                    }
                    return 0 /* False */;
                    function countMessageChainBreadth(info) {
                        if (!info)
                            return 0;
                        return reduceLeft(info, (value, chain) => value + 1 + countMessageChainBreadth(chain.next), 0);
                    }
                    function relateVariances(sourceTypeArguments, targetTypeArguments, variances, intersectionState2) {
                        if (result2 = typeArgumentsRelatedTo(sourceTypeArguments, targetTypeArguments, variances, reportErrors2, intersectionState2)) {
                            return result2;
                        }
                        if (some(variances, (v) => !!(v & 24 /* AllowsStructuralFallback */))) {
                            originalErrorInfo = void 0;
                            resetErrorInfo(saveErrorInfo);
                            return void 0;
                        }
                        const allowStructuralFallback = targetTypeArguments && hasCovariantVoidArgument(targetTypeArguments, variances);
                        varianceCheckFailed = !allowStructuralFallback;
                        if (variances !== emptyArray && !allowStructuralFallback) {
                            if (varianceCheckFailed && !(reportErrors2 && some(variances, (v) => (v & 7 /* VarianceMask */) === 0 /* Invariant */))) {
                                return 0 /* False */;
                            }
                            originalErrorInfo = errorInfo;
                            resetErrorInfo(saveErrorInfo);
                        }
                    }
                }
                function mappedTypeRelatedTo(source2, target2, reportErrors2) {
                    const modifiersRelated = relation === comparableRelation || (relation === identityRelation ? getMappedTypeModifiers(source2) === getMappedTypeModifiers(target2) : getCombinedMappedTypeOptionality(source2) <= getCombinedMappedTypeOptionality(target2));
                    if (modifiersRelated) {
                        let result2;
                        const targetConstraint = getConstraintTypeFromMappedType(target2);
                        const sourceConstraint = instantiateType(getConstraintTypeFromMappedType(source2), getCombinedMappedTypeOptionality(source2) < 0 ? reportUnmeasurableMapper : reportUnreliableMapper);
                        if (result2 = isRelatedTo(targetConstraint, sourceConstraint, 3 /* Both */, reportErrors2)) {
                            const mapper = createTypeMapper([getTypeParameterFromMappedType(source2)], [getTypeParameterFromMappedType(target2)]);
                            if (instantiateType(getNameTypeFromMappedType(source2), mapper) === instantiateType(getNameTypeFromMappedType(target2), mapper)) {
                                return result2 & isRelatedTo(instantiateType(getTemplateTypeFromMappedType(source2), mapper), getTemplateTypeFromMappedType(target2), 3 /* Both */, reportErrors2);
                            }
                        }
                    }
                    return 0 /* False */;
                }
                function typeRelatedToDiscriminatedType(source2, target2) {
                    var _a3;
                    const sourceProperties = getPropertiesOfType(source2);
                    const sourcePropertiesFiltered = findDiscriminantProperties(sourceProperties, target2);
                    if (!sourcePropertiesFiltered)
                        return 0 /* False */;
                    let numCombinations = 1;
                    for (const sourceProperty of sourcePropertiesFiltered) {
                        numCombinations *= countTypes(getNonMissingTypeOfSymbol(sourceProperty));
                        if (numCombinations > 25) {
                            (_a3 = tracing) == null ? void 0 : _a3.instant(tracing.Phase.CheckTypes, "typeRelatedToDiscriminatedType_DepthLimit", { sourceId: source2.id, targetId: target2.id, numCombinations });
                            return 0 /* False */;
                        }
                    }
                    const sourceDiscriminantTypes = new Array(sourcePropertiesFiltered.length);
                    const excludedProperties = /* @__PURE__ */ new Set();
                    for (let i = 0; i < sourcePropertiesFiltered.length; i++) {
                        const sourceProperty = sourcePropertiesFiltered[i];
                        const sourcePropertyType = getNonMissingTypeOfSymbol(sourceProperty);
                        sourceDiscriminantTypes[i] = sourcePropertyType.flags & 1048576 /* Union */ ? sourcePropertyType.types : [sourcePropertyType];
                        excludedProperties.add(sourceProperty.escapedName);
                    }
                    const discriminantCombinations = cartesianProduct(sourceDiscriminantTypes);
                    const matchingTypes = [];
                    for (const combination of discriminantCombinations) {
                        let hasMatch = false;
                        outer: for (const type of target2.types) {
                            for (let i = 0; i < sourcePropertiesFiltered.length; i++) {
                                const sourceProperty = sourcePropertiesFiltered[i];
                                const targetProperty = getPropertyOfType(type, sourceProperty.escapedName);
                                if (!targetProperty)
                                    continue outer;
                                if (sourceProperty === targetProperty)
                                    continue;
                                const related = propertyRelatedTo(source2, target2, sourceProperty, targetProperty, (_) => combination[i], 
                                /*reportErrors*/
                                false, 0 /* None */, 
                                /*skipOptional*/
                                strictNullChecks || relation === comparableRelation);
                                if (!related) {
                                    continue outer;
                                }
                            }
                            pushIfUnique(matchingTypes, type, equateValues);
                            hasMatch = true;
                        }
                        if (!hasMatch) {
                            return 0 /* False */;
                        }
                    }
                    let result2 = -1 /* True */;
                    for (const type of matchingTypes) {
                        result2 &= propertiesRelatedTo(source2, type, 
                        /*reportErrors*/
                        false, excludedProperties, 
                        /*optionalsOnly*/
                        false, 0 /* None */);
                        if (result2) {
                            result2 &= signaturesRelatedTo(source2, type, 0 /* Call */, 
                            /*reportStructuralErrors*/
                            false, 0 /* None */);
                            if (result2) {
                                result2 &= signaturesRelatedTo(source2, type, 1 /* Construct */, 
                                /*reportStructuralErrors*/
                                false, 0 /* None */);
                                if (result2 && !(isTupleType(source2) && isTupleType(type))) {
                                    result2 &= indexSignaturesRelatedTo(source2, type, 
                                    /*sourceIsPrimitive*/
                                    false, 
                                    /*reportStructuralErrors*/
                                    false, 0 /* None */);
                                }
                            }
                        }
                        if (!result2) {
                            return result2;
                        }
                    }
                    return result2;
                }
                function excludeProperties(properties, excludedProperties) {
                    if (!excludedProperties || properties.length === 0)
                        return properties;
                    let result2;
                    for (let i = 0; i < properties.length; i++) {
                        if (!excludedProperties.has(properties[i].escapedName)) {
                            if (result2) {
                                result2.push(properties[i]);
                            }
                        }
                        else if (!result2) {
                            result2 = properties.slice(0, i);
                        }
                    }
                    return result2 || properties;
                }
                function isPropertySymbolTypeRelated(sourceProp, targetProp, getTypeOfSourceProperty, reportErrors2, intersectionState) {
                    const targetIsOptional = strictNullChecks && !!(getCheckFlags(targetProp) & 48 /* Partial */);
                    const effectiveTarget = addOptionality(getNonMissingTypeOfSymbol(targetProp), 
                    /*isProperty*/
                    false, targetIsOptional);
                    const effectiveSource = getTypeOfSourceProperty(sourceProp);
                    return isRelatedTo(effectiveSource, effectiveTarget, 3 /* Both */, reportErrors2, 
                    /*headMessage*/
                    void 0, intersectionState);
                }
                function propertyRelatedTo(source2, target2, sourceProp, targetProp, getTypeOfSourceProperty, reportErrors2, intersectionState, skipOptional) {
                    const sourcePropFlags = getDeclarationModifierFlagsFromSymbol(sourceProp);
                    const targetPropFlags = getDeclarationModifierFlagsFromSymbol(targetProp);
                    if (sourcePropFlags & 8 /* Private */ || targetPropFlags & 8 /* Private */) {
                        if (sourceProp.valueDeclaration !== targetProp.valueDeclaration) {
                            if (reportErrors2) {
                                if (sourcePropFlags & 8 /* Private */ && targetPropFlags & 8 /* Private */) {
                                    reportError(Diagnostics.Types_have_separate_declarations_of_a_private_property_0, symbolToString(targetProp));
                                }
                                else {
                                    reportError(Diagnostics.Property_0_is_private_in_type_1_but_not_in_type_2, symbolToString(targetProp), typeToString(sourcePropFlags & 8 /* Private */ ? source2 : target2), typeToString(sourcePropFlags & 8 /* Private */ ? target2 : source2));
                                }
                            }
                            return 0 /* False */;
                        }
                    }
                    else if (targetPropFlags & 16 /* Protected */) {
                        if (!isValidOverrideOf(sourceProp, targetProp)) {
                            if (reportErrors2) {
                                reportError(Diagnostics.Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2, symbolToString(targetProp), typeToString(getDeclaringClass(sourceProp) || source2), typeToString(getDeclaringClass(targetProp) || target2));
                            }
                            return 0 /* False */;
                        }
                    }
                    else if (sourcePropFlags & 16 /* Protected */) {
                        if (reportErrors2) {
                            reportError(Diagnostics.Property_0_is_protected_in_type_1_but_public_in_type_2, symbolToString(targetProp), typeToString(source2), typeToString(target2));
                        }
                        return 0 /* False */;
                    }
                    if (relation === strictSubtypeRelation && isReadonlySymbol(sourceProp) && !isReadonlySymbol(targetProp)) {
                        return 0 /* False */;
                    }
                    const related = isPropertySymbolTypeRelated(sourceProp, targetProp, getTypeOfSourceProperty, reportErrors2, intersectionState);
                    if (!related) {
                        if (reportErrors2) {
                            reportIncompatibleError(Diagnostics.Types_of_property_0_are_incompatible, symbolToString(targetProp));
                        }
                        return 0 /* False */;
                    }
                    if (!skipOptional && sourceProp.flags & 16777216 /* Optional */ && targetProp.flags & 106500 /* ClassMember */ && !(targetProp.flags & 16777216 /* Optional */)) {
                        if (reportErrors2) {
                            reportError(Diagnostics.Property_0_is_optional_in_type_1_but_required_in_type_2, symbolToString(targetProp), typeToString(source2), typeToString(target2));
                        }
                        return 0 /* False */;
                    }
                    return related;
                }
                function reportUnmatchedProperty(source2, target2, unmatchedProperty, requireOptionalProperties) {
                    let shouldSkipElaboration = false;
                    if (unmatchedProperty.valueDeclaration && isNamedDeclaration(unmatchedProperty.valueDeclaration) && isPrivateIdentifier(unmatchedProperty.valueDeclaration.name) && source2.symbol && source2.symbol.flags & 32 /* Class */) {
                        const privateIdentifierDescription = unmatchedProperty.valueDeclaration.name.escapedText;
                        const symbolTableKey = getSymbolNameForPrivateIdentifier(source2.symbol, privateIdentifierDescription);
                        if (symbolTableKey && getPropertyOfType(source2, symbolTableKey)) {
                            const sourceName = factory.getDeclarationName(source2.symbol.valueDeclaration);
                            const targetName = factory.getDeclarationName(target2.symbol.valueDeclaration);
                            reportError(Diagnostics.Property_0_in_type_1_refers_to_a_different_member_that_cannot_be_accessed_from_within_type_2, diagnosticName(privateIdentifierDescription), diagnosticName(sourceName.escapedText === "" ? anon : sourceName), diagnosticName(targetName.escapedText === "" ? anon : targetName));
                            return;
                        }
                    }
                    const props = arrayFrom(getUnmatchedProperties(source2, target2, requireOptionalProperties, 
                    /*matchDiscriminantProperties*/
                    false));
                    if (!headMessage || headMessage.code !== Diagnostics.Class_0_incorrectly_implements_interface_1.code && headMessage.code !== Diagnostics.Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclass.code) {
                        shouldSkipElaboration = true;
                    }
                    if (props.length === 1) {
                        const propName = symbolToString(unmatchedProperty, 
                        /*enclosingDeclaration*/
                        void 0, 0 /* None */, 4 /* AllowAnyNodeKind */ | 16 /* WriteComputedProps */);
                        reportError(Diagnostics.Property_0_is_missing_in_type_1_but_required_in_type_2, propName, ...getTypeNamesForErrorDisplay(source2, target2));
                        if (length(unmatchedProperty.declarations)) {
                            associateRelatedInfo(createDiagnosticForNode(unmatchedProperty.declarations[0], Diagnostics._0_is_declared_here, propName));
                        }
                        if (shouldSkipElaboration && errorInfo) {
                            overrideNextErrorInfo++;
                        }
                    }
                    else if (tryElaborateArrayLikeErrors(source2, target2, 
                    /*reportErrors*/
                    false)) {
                        if (props.length > 5) {
                            reportError(Diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2_and_3_more, typeToString(source2), typeToString(target2), map(props.slice(0, 4), (p) => symbolToString(p)).join(", "), props.length - 4);
                        }
                        else {
                            reportError(Diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2, typeToString(source2), typeToString(target2), map(props, (p) => symbolToString(p)).join(", "));
                        }
                        if (shouldSkipElaboration && errorInfo) {
                            overrideNextErrorInfo++;
                        }
                    }
                }
                function propertiesRelatedTo(source2, target2, reportErrors2, excludedProperties, optionalsOnly, intersectionState) {
                    if (relation === identityRelation) {
                        return propertiesIdenticalTo(source2, target2, excludedProperties);
                    }
                    let result2 = -1 /* True */;
                    if (isTupleType(target2)) {
                        if (isArrayOrTupleType(source2)) {
                            if (!target2.target.readonly && (isReadonlyArrayType(source2) || isTupleType(source2) && source2.target.readonly)) {
                                return 0 /* False */;
                            }
                            const sourceArity = getTypeReferenceArity(source2);
                            const targetArity = getTypeReferenceArity(target2);
                            const sourceRestFlag = isTupleType(source2) ? source2.target.combinedFlags & 4 /* Rest */ : 4 /* Rest */;
                            const targetRestFlag = target2.target.combinedFlags & 4 /* Rest */;
                            const sourceMinLength = isTupleType(source2) ? source2.target.minLength : 0;
                            const targetMinLength = target2.target.minLength;
                            if (!sourceRestFlag && sourceArity < targetMinLength) {
                                if (reportErrors2) {
                                    reportError(Diagnostics.Source_has_0_element_s_but_target_requires_1, sourceArity, targetMinLength);
                                }
                                return 0 /* False */;
                            }
                            if (!targetRestFlag && targetArity < sourceMinLength) {
                                if (reportErrors2) {
                                    reportError(Diagnostics.Source_has_0_element_s_but_target_allows_only_1, sourceMinLength, targetArity);
                                }
                                return 0 /* False */;
                            }
                            if (!targetRestFlag && (sourceRestFlag || targetArity < sourceArity)) {
                                if (reportErrors2) {
                                    if (sourceMinLength < targetMinLength) {
                                        reportError(Diagnostics.Target_requires_0_element_s_but_source_may_have_fewer, targetMinLength);
                                    }
                                    else {
                                        reportError(Diagnostics.Target_allows_only_0_element_s_but_source_may_have_more, targetArity);
                                    }
                                }
                                return 0 /* False */;
                            }
                            const sourceTypeArguments = getTypeArguments(source2);
                            const targetTypeArguments = getTypeArguments(target2);
                            const targetStartCount = getStartElementCount(target2.target, 11 /* NonRest */);
                            const targetEndCount = getEndElementCount(target2.target, 11 /* NonRest */);
                            const targetHasRestElement = target2.target.hasRestElement;
                            let canExcludeDiscriminants = !!excludedProperties;
                            for (let sourcePosition = 0; sourcePosition < sourceArity; sourcePosition++) {
                                const sourceFlags = isTupleType(source2) ? source2.target.elementFlags[sourcePosition] : 4 /* Rest */;
                                const sourcePositionFromEnd = sourceArity - 1 - sourcePosition;
                                const targetPosition = targetHasRestElement && sourcePosition >= targetStartCount ? targetArity - 1 - Math.min(sourcePositionFromEnd, targetEndCount) : sourcePosition;
                                const targetFlags = target2.target.elementFlags[targetPosition];
                                if (targetFlags & 8 /* Variadic */ && !(sourceFlags & 8 /* Variadic */)) {
                                    if (reportErrors2) {
                                        reportError(Diagnostics.Source_provides_no_match_for_variadic_element_at_position_0_in_target, targetPosition);
                                    }
                                    return 0 /* False */;
                                }
                                if (sourceFlags & 8 /* Variadic */ && !(targetFlags & 12 /* Variable */)) {
                                    if (reportErrors2) {
                                        reportError(Diagnostics.Variadic_element_at_position_0_in_source_does_not_match_element_at_position_1_in_target, sourcePosition, targetPosition);
                                    }
                                    return 0 /* False */;
                                }
                                if (targetFlags & 1 /* Required */ && !(sourceFlags & 1 /* Required */)) {
                                    if (reportErrors2) {
                                        reportError(Diagnostics.Source_provides_no_match_for_required_element_at_position_0_in_target, targetPosition);
                                    }
                                    return 0 /* False */;
                                }
                                if (canExcludeDiscriminants) {
                                    if (sourceFlags & 12 /* Variable */ || targetFlags & 12 /* Variable */) {
                                        canExcludeDiscriminants = false;
                                    }
                                    if (canExcludeDiscriminants && (excludedProperties == null ? void 0 : excludedProperties.has("" + sourcePosition))) {
                                        continue;
                                    }
                                }
                                const sourceType = removeMissingType(sourceTypeArguments[sourcePosition], !!(sourceFlags & targetFlags & 2 /* Optional */));
                                const targetType = targetTypeArguments[targetPosition];
                                const targetCheckType = sourceFlags & 8 /* Variadic */ && targetFlags & 4 /* Rest */ ? createArrayType(targetType) : removeMissingType(targetType, !!(targetFlags & 2 /* Optional */));
                                const related = isRelatedTo(sourceType, targetCheckType, 3 /* Both */, reportErrors2, 
                                /*headMessage*/
                                void 0, intersectionState);
                                if (!related) {
                                    if (reportErrors2 && (targetArity > 1 || sourceArity > 1)) {
                                        if (targetHasRestElement && sourcePosition >= targetStartCount && sourcePositionFromEnd >= targetEndCount && targetStartCount !== sourceArity - targetEndCount - 1) {
                                            reportIncompatibleError(Diagnostics.Type_at_positions_0_through_1_in_source_is_not_compatible_with_type_at_position_2_in_target, targetStartCount, sourceArity - targetEndCount - 1, targetPosition);
                                        }
                                        else {
                                            reportIncompatibleError(Diagnostics.Type_at_position_0_in_source_is_not_compatible_with_type_at_position_1_in_target, sourcePosition, targetPosition);
                                        }
                                    }
                                    return 0 /* False */;
                                }
                                result2 &= related;
                            }
                            return result2;
                        }
                        if (target2.target.combinedFlags & 12 /* Variable */) {
                            return 0 /* False */;
                        }
                    }
                    const requireOptionalProperties = (relation === subtypeRelation || relation === strictSubtypeRelation) && !isObjectLiteralType2(source2) && !isEmptyArrayLiteralType(source2) && !isTupleType(source2);
                    const unmatchedProperty = getUnmatchedProperty(source2, target2, requireOptionalProperties, 
                    /*matchDiscriminantProperties*/
                    false);
                    if (unmatchedProperty) {
                        if (reportErrors2 && shouldReportUnmatchedPropertyError(source2, target2)) {
                            reportUnmatchedProperty(source2, target2, unmatchedProperty, requireOptionalProperties);
                        }
                        return 0 /* False */;
                    }
                    if (isObjectLiteralType2(target2)) {
                        for (const sourceProp of excludeProperties(getPropertiesOfType(source2), excludedProperties)) {
                            if (!getPropertyOfObjectType(target2, sourceProp.escapedName)) {
                                const sourceType = getTypeOfSymbol(sourceProp);
                                if (!(sourceType.flags & 32768 /* Undefined */)) {
                                    if (reportErrors2) {
                                        reportError(Diagnostics.Property_0_does_not_exist_on_type_1, symbolToString(sourceProp), typeToString(target2));
                                    }
                                    return 0 /* False */;
                                }
                            }
                        }
                    }
                    const properties = getPropertiesOfType(target2);
                    const numericNamesOnly = isTupleType(source2) && isTupleType(target2);
                    for (const targetProp of excludeProperties(properties, excludedProperties)) {
                        const name = targetProp.escapedName;
                        if (!(targetProp.flags & 4194304 /* Prototype */) && (!numericNamesOnly || isNumericLiteralName(name) || name === "length") && (!optionalsOnly || targetProp.flags & 16777216 /* Optional */)) {
                            const sourceProp = getPropertyOfType(source2, name);
                            if (sourceProp && sourceProp !== targetProp) {
                                const related = propertyRelatedTo(source2, target2, sourceProp, targetProp, getNonMissingTypeOfSymbol, reportErrors2, intersectionState, relation === comparableRelation);
                                if (!related) {
                                    return 0 /* False */;
                                }
                                result2 &= related;
                            }
                        }
                    }
                    return result2;
                }
                function propertiesIdenticalTo(source2, target2, excludedProperties) {
                    if (!(source2.flags & 524288 /* Object */ && target2.flags & 524288 /* Object */)) {
                        return 0 /* False */;
                    }
                    const sourceProperties = excludeProperties(getPropertiesOfObjectType(source2), excludedProperties);
                    const targetProperties = excludeProperties(getPropertiesOfObjectType(target2), excludedProperties);
                    if (sourceProperties.length !== targetProperties.length) {
                        return 0 /* False */;
                    }
                    let result2 = -1 /* True */;
                    for (const sourceProp of sourceProperties) {
                        const targetProp = getPropertyOfObjectType(target2, sourceProp.escapedName);
                        if (!targetProp) {
                            return 0 /* False */;
                        }
                        const related = compareProperties2(sourceProp, targetProp, isRelatedTo);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }
                function signaturesRelatedTo(source2, target2, kind, reportErrors2, intersectionState) {
                    var _a3, _b;
                    if (relation === identityRelation) {
                        return signaturesIdenticalTo(source2, target2, kind);
                    }
                    if (target2 === anyFunctionType || source2 === anyFunctionType) {
                        return -1 /* True */;
                    }
                    const sourceIsJSConstructor = source2.symbol && isJSConstructor(source2.symbol.valueDeclaration);
                    const targetIsJSConstructor = target2.symbol && isJSConstructor(target2.symbol.valueDeclaration);
                    const sourceSignatures = getSignaturesOfType(source2, sourceIsJSConstructor && kind === 1 /* Construct */ ? 0 /* Call */ : kind);
                    const targetSignatures = getSignaturesOfType(target2, targetIsJSConstructor && kind === 1 /* Construct */ ? 0 /* Call */ : kind);
                    if (kind === 1 /* Construct */ && sourceSignatures.length && targetSignatures.length) {
                        const sourceIsAbstract = !!(sourceSignatures[0].flags & 4 /* Abstract */);
                        const targetIsAbstract = !!(targetSignatures[0].flags & 4 /* Abstract */);
                        if (sourceIsAbstract && !targetIsAbstract) {
                            if (reportErrors2) {
                                reportError(Diagnostics.Cannot_assign_an_abstract_constructor_type_to_a_non_abstract_constructor_type);
                            }
                            return 0 /* False */;
                        }
                        if (!constructorVisibilitiesAreCompatible(sourceSignatures[0], targetSignatures[0], reportErrors2)) {
                            return 0 /* False */;
                        }
                    }
                    let result2 = -1 /* True */;
                    const incompatibleReporter = kind === 1 /* Construct */ ? reportIncompatibleConstructSignatureReturn : reportIncompatibleCallSignatureReturn;
                    const sourceObjectFlags = getObjectFlags(source2);
                    const targetObjectFlags = getObjectFlags(target2);
                    if (sourceObjectFlags & 64 /* Instantiated */ && targetObjectFlags & 64 /* Instantiated */ && source2.symbol === target2.symbol || sourceObjectFlags & 4 /* Reference */ && targetObjectFlags & 4 /* Reference */ && source2.target === target2.target) {
                        for (let i = 0; i < targetSignatures.length; i++) {
                            const related = signatureRelatedTo(sourceSignatures[i], targetSignatures[i], 
                            /*erase*/
                            true, reportErrors2, intersectionState, incompatibleReporter(sourceSignatures[i], targetSignatures[i]));
                            if (!related) {
                                return 0 /* False */;
                            }
                            result2 &= related;
                        }
                    }
                    else if (sourceSignatures.length === 1 && targetSignatures.length === 1) {
                        const eraseGenerics = relation === comparableRelation || !!compilerOptions.noStrictGenericChecks;
                        const sourceSignature = first(sourceSignatures);
                        const targetSignature = first(targetSignatures);
                        result2 = signatureRelatedTo(sourceSignature, targetSignature, eraseGenerics, reportErrors2, intersectionState, incompatibleReporter(sourceSignature, targetSignature));
                        if (!result2 && reportErrors2 && kind === 1 /* Construct */ && sourceObjectFlags & targetObjectFlags && (((_a3 = targetSignature.declaration) == null ? void 0 : _a3.kind) === 173 /* Constructor */ || ((_b = sourceSignature.declaration) == null ? void 0 : _b.kind) === 173 /* Constructor */)) {
                            const constructSignatureToString = (signature) => signatureToString(signature, 
                            /*enclosingDeclaration*/
                            void 0, 262144 /* WriteArrowStyleSignature */, kind);
                            reportError(Diagnostics.Type_0_is_not_assignable_to_type_1, constructSignatureToString(sourceSignature), constructSignatureToString(targetSignature));
                            reportError(Diagnostics.Types_of_construct_signatures_are_incompatible);
                            return result2;
                        }
                    }
                    else {
                        outer: for (const t of targetSignatures) {
                            const saveErrorInfo = captureErrorCalculationState();
                            let shouldElaborateErrors = reportErrors2;
                            for (const s of sourceSignatures) {
                                const related = signatureRelatedTo(s, t, 
                                /*erase*/
                                true, shouldElaborateErrors, intersectionState, incompatibleReporter(s, t));
                                if (related) {
                                    result2 &= related;
                                    resetErrorInfo(saveErrorInfo);
                                    continue outer;
                                }
                                shouldElaborateErrors = false;
                            }
                            if (shouldElaborateErrors) {
                                reportError(Diagnostics.Type_0_provides_no_match_for_the_signature_1, typeToString(source2), signatureToString(t, 
                                /*enclosingDeclaration*/
                                void 0, 
                                /*flags*/
                                void 0, kind));
                            }
                            return 0 /* False */;
                        }
                    }
                    return result2;
                }
                function shouldReportUnmatchedPropertyError(source2, target2) {
                    const typeCallSignatures = getSignaturesOfStructuredType(source2, 0 /* Call */);
                    const typeConstructSignatures = getSignaturesOfStructuredType(source2, 1 /* Construct */);
                    const typeProperties = getPropertiesOfObjectType(source2);
                    if ((typeCallSignatures.length || typeConstructSignatures.length) && !typeProperties.length) {
                        if (getSignaturesOfType(target2, 0 /* Call */).length && typeCallSignatures.length || getSignaturesOfType(target2, 1 /* Construct */).length && typeConstructSignatures.length) {
                            return true;
                        }
                        return false;
                    }
                    return true;
                }
                function reportIncompatibleCallSignatureReturn(siga, sigb) {
                    if (siga.parameters.length === 0 && sigb.parameters.length === 0) {
                        return (source2, target2) => reportIncompatibleError(Diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1, typeToString(source2), typeToString(target2));
                    }
                    return (source2, target2) => reportIncompatibleError(Diagnostics.Call_signature_return_types_0_and_1_are_incompatible, typeToString(source2), typeToString(target2));
                }
                function reportIncompatibleConstructSignatureReturn(siga, sigb) {
                    if (siga.parameters.length === 0 && sigb.parameters.length === 0) {
                        return (source2, target2) => reportIncompatibleError(Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1, typeToString(source2), typeToString(target2));
                    }
                    return (source2, target2) => reportIncompatibleError(Diagnostics.Construct_signature_return_types_0_and_1_are_incompatible, typeToString(source2), typeToString(target2));
                }
                function signatureRelatedTo(source2, target2, erase, reportErrors2, intersectionState, incompatibleReporter) {
                    const checkMode = relation === subtypeRelation ? 16 /* StrictTopSignature */ : relation === strictSubtypeRelation ? 16 /* StrictTopSignature */ | 8 /* StrictArity */ : 0 /* None */;
                    return compareSignaturesRelated(erase ? getErasedSignature(source2) : source2, erase ? getErasedSignature(target2) : target2, checkMode, reportErrors2, reportError, incompatibleReporter, isRelatedToWorker2, reportUnreliableMapper);
                    function isRelatedToWorker2(source3, target3, reportErrors3) {
                        return isRelatedTo(source3, target3, 3 /* Both */, reportErrors3, 
                        /*headMessage*/
                        void 0, intersectionState);
                    }
                }
                function signaturesIdenticalTo(source2, target2, kind) {
                    const sourceSignatures = getSignaturesOfType(source2, kind);
                    const targetSignatures = getSignaturesOfType(target2, kind);
                    if (sourceSignatures.length !== targetSignatures.length) {
                        return 0 /* False */;
                    }
                    let result2 = -1 /* True */;
                    for (let i = 0; i < sourceSignatures.length; i++) {
                        const related = compareSignaturesIdentical(sourceSignatures[i], targetSignatures[i], 
                        /*partialMatch*/
                        false, 
                        /*ignoreThisTypes*/
                        false, 
                        /*ignoreReturnTypes*/
                        false, isRelatedTo);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }
                function membersRelatedToIndexInfo(source2, targetInfo, reportErrors2, intersectionState) {
                    let result2 = -1 /* True */;
                    const keyType = targetInfo.keyType;
                    const props = source2.flags & 2097152 /* Intersection */ ? getPropertiesOfUnionOrIntersectionType(source2) : getPropertiesOfObjectType(source2);
                    for (const prop of props) {
                        if (isIgnoredJsxProperty(source2, prop)) {
                            continue;
                        }
                        if (isApplicableIndexType(getLiteralTypeFromProperty(prop, 8576 /* StringOrNumberLiteralOrUnique */), keyType)) {
                            const propType = getNonMissingTypeOfSymbol(prop);
                            const type = exactOptionalPropertyTypes || propType.flags & 32768 /* Undefined */ || keyType === numberType || !(prop.flags & 16777216 /* Optional */) ? propType : getTypeWithFacts(propType, 524288 /* NEUndefined */);
                            const related = isRelatedTo(type, targetInfo.type, 3 /* Both */, reportErrors2, 
                            /*headMessage*/
                            void 0, intersectionState);
                            if (!related) {
                                if (reportErrors2) {
                                    reportError(Diagnostics.Property_0_is_incompatible_with_index_signature, symbolToString(prop));
                                }
                                return 0 /* False */;
                            }
                            result2 &= related;
                        }
                    }
                    for (const info of getIndexInfosOfType(source2)) {
                        if (isApplicableIndexType(info.keyType, keyType)) {
                            const related = indexInfoRelatedTo(info, targetInfo, reportErrors2, intersectionState);
                            if (!related) {
                                return 0 /* False */;
                            }
                            result2 &= related;
                        }
                    }
                    return result2;
                }
                function indexInfoRelatedTo(sourceInfo, targetInfo, reportErrors2, intersectionState) {
                    const related = isRelatedTo(sourceInfo.type, targetInfo.type, 3 /* Both */, reportErrors2, 
                    /*headMessage*/
                    void 0, intersectionState);
                    if (!related && reportErrors2) {
                        if (sourceInfo.keyType === targetInfo.keyType) {
                            reportError(Diagnostics._0_index_signatures_are_incompatible, typeToString(sourceInfo.keyType));
                        }
                        else {
                            reportError(Diagnostics._0_and_1_index_signatures_are_incompatible, typeToString(sourceInfo.keyType), typeToString(targetInfo.keyType));
                        }
                    }
                    return related;
                }
                function indexSignaturesRelatedTo(source2, target2, sourceIsPrimitive, reportErrors2, intersectionState) {
                    if (relation === identityRelation) {
                        return indexSignaturesIdenticalTo(source2, target2);
                    }
                    const indexInfos = getIndexInfosOfType(target2);
                    const targetHasStringIndex = some(indexInfos, (info) => info.keyType === stringType);
                    let result2 = -1 /* True */;
                    for (const targetInfo of indexInfos) {
                        const related = relation !== strictSubtypeRelation && !sourceIsPrimitive && targetHasStringIndex && targetInfo.type.flags & 1 /* Any */ ? -1 /* True */ : isGenericMappedType(source2) && targetHasStringIndex ? isRelatedTo(getTemplateTypeFromMappedType(source2), targetInfo.type, 3 /* Both */, reportErrors2) : typeRelatedToIndexInfo(source2, targetInfo, reportErrors2, intersectionState);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }
                function typeRelatedToIndexInfo(source2, targetInfo, reportErrors2, intersectionState) {
                    const sourceInfo = getApplicableIndexInfo(source2, targetInfo.keyType);
                    if (sourceInfo) {
                        return indexInfoRelatedTo(sourceInfo, targetInfo, reportErrors2, intersectionState);
                    }
                    if (!(intersectionState & 1 /* Source */) && (relation !== strictSubtypeRelation || getObjectFlags(source2) & 8192 /* FreshLiteral */) && isObjectTypeWithInferableIndex(source2)) {
                        return membersRelatedToIndexInfo(source2, targetInfo, reportErrors2, intersectionState);
                    }
                    if (reportErrors2) {
                        reportError(Diagnostics.Index_signature_for_type_0_is_missing_in_type_1, typeToString(targetInfo.keyType), typeToString(source2));
                    }
                    return 0 /* False */;
                }
                function indexSignaturesIdenticalTo(source2, target2) {
                    const sourceInfos = getIndexInfosOfType(source2);
                    const targetInfos = getIndexInfosOfType(target2);
                    if (sourceInfos.length !== targetInfos.length) {
                        return 0 /* False */;
                    }
                    for (const targetInfo of targetInfos) {
                        const sourceInfo = getIndexInfoOfType(source2, targetInfo.keyType);
                        if (!(sourceInfo && isRelatedTo(sourceInfo.type, targetInfo.type, 3 /* Both */) && sourceInfo.isReadonly === targetInfo.isReadonly)) {
                            return 0 /* False */;
                        }
                    }
                    return -1 /* True */;
                }
                function constructorVisibilitiesAreCompatible(sourceSignature, targetSignature, reportErrors2) {
                    if (!sourceSignature.declaration || !targetSignature.declaration) {
                        return true;
                    }
                    const sourceAccessibility = getSelectedEffectiveModifierFlags(sourceSignature.declaration, 24 /* NonPublicAccessibilityModifier */);
                    const targetAccessibility = getSelectedEffectiveModifierFlags(targetSignature.declaration, 24 /* NonPublicAccessibilityModifier */);
                    if (targetAccessibility === 8 /* Private */) {
                        return true;
                    }
                    if (targetAccessibility === 16 /* Protected */ && sourceAccessibility !== 8 /* Private */) {
                        return true;
                    }
                    if (targetAccessibility !== 16 /* Protected */ && !sourceAccessibility) {
                        return true;
                    }
                    if (reportErrors2) {
                        reportError(Diagnostics.Cannot_assign_a_0_constructor_type_to_a_1_constructor_type, visibilityToString(sourceAccessibility), visibilityToString(targetAccessibility));
                    }
                    return false;
                }
            }