function inferFromObjectTypes(source, target) {
                    var _a2, _b;
                    if (getObjectFlags(source) & 4 /* Reference */ && getObjectFlags(target) & 4 /* Reference */ && (source.target === target.target || isArrayType(source) && isArrayType(target))) {
                        inferFromTypeArguments(getTypeArguments(source), getTypeArguments(target), getVariances(source.target));
                        return;
                    }
                    if (isGenericMappedType(source) && isGenericMappedType(target)) {
                        inferFromTypes(getConstraintTypeFromMappedType(source), getConstraintTypeFromMappedType(target));
                        inferFromTypes(getTemplateTypeFromMappedType(source), getTemplateTypeFromMappedType(target));
                        const sourceNameType = getNameTypeFromMappedType(source);
                        const targetNameType = getNameTypeFromMappedType(target);
                        if (sourceNameType && targetNameType)
                            inferFromTypes(sourceNameType, targetNameType);
                    }
                    if (getObjectFlags(target) & 32 /* Mapped */ && !target.declaration.nameType) {
                        const constraintType = getConstraintTypeFromMappedType(target);
                        if (inferToMappedType(source, target, constraintType)) {
                            return;
                        }
                    }
                    if (!typesDefinitelyUnrelated(source, target)) {
                        if (isArrayOrTupleType(source)) {
                            if (isTupleType(target)) {
                                const sourceArity = getTypeReferenceArity(source);
                                const targetArity = getTypeReferenceArity(target);
                                const elementTypes = getTypeArguments(target);
                                const elementFlags = target.target.elementFlags;
                                if (isTupleType(source) && isTupleTypeStructureMatching(source, target)) {
                                    for (let i = 0; i < targetArity; i++) {
                                        inferFromTypes(getTypeArguments(source)[i], elementTypes[i]);
                                    }
                                    return;
                                }
                                const startLength = isTupleType(source) ? Math.min(source.target.fixedLength, target.target.fixedLength) : 0;
                                const endLength = Math.min(isTupleType(source) ? getEndElementCount(source.target, 3 /* Fixed */) : 0, target.target.hasRestElement ? getEndElementCount(target.target, 3 /* Fixed */) : 0);
                                for (let i = 0; i < startLength; i++) {
                                    inferFromTypes(getTypeArguments(source)[i], elementTypes[i]);
                                }
                                if (!isTupleType(source) || sourceArity - startLength - endLength === 1 && source.target.elementFlags[startLength] & 4 /* Rest */) {
                                    const restType = getTypeArguments(source)[startLength];
                                    for (let i = startLength; i < targetArity - endLength; i++) {
                                        inferFromTypes(elementFlags[i] & 8 /* Variadic */ ? createArrayType(restType) : restType, elementTypes[i]);
                                    }
                                }
                                else {
                                    const middleLength = targetArity - startLength - endLength;
                                    if (middleLength === 2) {
                                        if (elementFlags[startLength] & elementFlags[startLength + 1] & 8 /* Variadic */) {
                                            const targetInfo = getInferenceInfoForType(elementTypes[startLength]);
                                            if (targetInfo && targetInfo.impliedArity !== void 0) {
                                                inferFromTypes(sliceTupleType(source, startLength, endLength + sourceArity - targetInfo.impliedArity), elementTypes[startLength]);
                                                inferFromTypes(sliceTupleType(source, startLength + targetInfo.impliedArity, endLength), elementTypes[startLength + 1]);
                                            }
                                        }
                                        else if (elementFlags[startLength] & 8 /* Variadic */ && elementFlags[startLength + 1] & 4 /* Rest */) {
                                            const param = (_a2 = getInferenceInfoForType(elementTypes[startLength])) == null ? void 0 : _a2.typeParameter;
                                            const constraint = param && getBaseConstraintOfType(param);
                                            if (constraint && isTupleType(constraint) && !constraint.target.hasRestElement) {
                                                const impliedArity = constraint.target.fixedLength;
                                                inferFromTypes(sliceTupleType(source, startLength, sourceArity - (startLength + impliedArity)), elementTypes[startLength]);
                                                inferFromTypes(getElementTypeOfSliceOfTupleType(source, startLength + impliedArity, endLength), elementTypes[startLength + 1]);
                                            }
                                        }
                                        else if (elementFlags[startLength] & 4 /* Rest */ && elementFlags[startLength + 1] & 8 /* Variadic */) {
                                            const param = (_b = getInferenceInfoForType(elementTypes[startLength + 1])) == null ? void 0 : _b.typeParameter;
                                            const constraint = param && getBaseConstraintOfType(param);
                                            if (constraint && isTupleType(constraint) && !constraint.target.hasRestElement) {
                                                const impliedArity = constraint.target.fixedLength;
                                                const endIndex = sourceArity - getEndElementCount(target.target, 3 /* Fixed */);
                                                const startIndex = endIndex - impliedArity;
                                                const trailingSlice = createTupleType(getTypeArguments(source).slice(startIndex, endIndex), source.target.elementFlags.slice(startIndex, endIndex), 
                                                /*readonly*/
                                                false, source.target.labeledElementDeclarations && source.target.labeledElementDeclarations.slice(startIndex, endIndex));
                                                inferFromTypes(getElementTypeOfSliceOfTupleType(source, startLength, endLength + impliedArity), elementTypes[startLength]);
                                                inferFromTypes(trailingSlice, elementTypes[startLength + 1]);
                                            }
                                        }
                                    }
                                    else if (middleLength === 1 && elementFlags[startLength] & 8 /* Variadic */) {
                                        const endsInOptional = target.target.elementFlags[targetArity - 1] & 2 /* Optional */;
                                        const sourceSlice = sliceTupleType(source, startLength, endLength);
                                        inferWithPriority(sourceSlice, elementTypes[startLength], endsInOptional ? 2 /* SpeculativeTuple */ : 0);
                                    }
                                    else if (middleLength === 1 && elementFlags[startLength] & 4 /* Rest */) {
                                        const restType = getElementTypeOfSliceOfTupleType(source, startLength, endLength);
                                        if (restType) {
                                            inferFromTypes(restType, elementTypes[startLength]);
                                        }
                                    }
                                }
                                for (let i = 0; i < endLength; i++) {
                                    inferFromTypes(getTypeArguments(source)[sourceArity - i - 1], elementTypes[targetArity - i - 1]);
                                }
                                return;
                            }
                            if (isArrayType(target)) {
                                inferFromIndexTypes(source, target);
                                return;
                            }
                        }
                        inferFromProperties(source, target);
                        inferFromSignatures(source, target, 0 /* Call */);
                        inferFromSignatures(source, target, 1 /* Construct */);
                        inferFromIndexTypes(source, target);
                    }
                }