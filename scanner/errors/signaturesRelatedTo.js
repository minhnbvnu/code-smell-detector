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