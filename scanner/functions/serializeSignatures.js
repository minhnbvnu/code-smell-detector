function serializeSignatures(kind, input, baseType, outputKind) {
                        const signatures = getSignaturesOfType(input, kind);
                        if (kind === 1 /* Construct */) {
                            if (!baseType && every(signatures, (s) => length(s.parameters) === 0)) {
                                return [];
                            }
                            if (baseType) {
                                const baseSigs = getSignaturesOfType(baseType, 1 /* Construct */);
                                if (!length(baseSigs) && every(signatures, (s) => length(s.parameters) === 0)) {
                                    return [];
                                }
                                if (baseSigs.length === signatures.length) {
                                    let failed = false;
                                    for (let i = 0; i < baseSigs.length; i++) {
                                        if (!compareSignaturesIdentical(signatures[i], baseSigs[i], 
                                        /*partialMatch*/
                                        false, 
                                        /*ignoreThisTypes*/
                                        false, 
                                        /*ignoreReturnTypes*/
                                        true, compareTypesIdentical)) {
                                            failed = true;
                                            break;
                                        }
                                    }
                                    if (!failed) {
                                        return [];
                                    }
                                }
                            }
                            let privateProtected = 0;
                            for (const s of signatures) {
                                if (s.declaration) {
                                    privateProtected |= getSelectedEffectiveModifierFlags(s.declaration, 8 /* Private */ | 16 /* Protected */);
                                }
                            }
                            if (privateProtected) {
                                return [setTextRange(factory.createConstructorDeclaration(factory.createModifiersFromModifierFlags(privateProtected), 
                                    /*parameters*/
                                    [], 
                                    /*body*/
                                    void 0), signatures[0].declaration)];
                            }
                        }
                        const results2 = [];
                        for (const sig of signatures) {
                            const decl = signatureToSignatureDeclarationHelper(sig, outputKind, context);
                            results2.push(setTextRange(decl, sig.declaration));
                        }
                        return results2;
                    }