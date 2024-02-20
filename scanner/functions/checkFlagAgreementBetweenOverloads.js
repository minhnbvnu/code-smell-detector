function checkFlagAgreementBetweenOverloads(overloads, implementation, flagsToCheck2, someOverloadFlags, allOverloadFlags) {
                    const someButNotAllOverloadFlags = someOverloadFlags ^ allOverloadFlags;
                    if (someButNotAllOverloadFlags !== 0) {
                        const canonicalFlags = getEffectiveDeclarationFlags(getCanonicalOverload(overloads, implementation), flagsToCheck2);
                        forEach(overloads, (o) => {
                            const deviation = getEffectiveDeclarationFlags(o, flagsToCheck2) ^ canonicalFlags;
                            if (deviation & 1 /* Export */) {
                                error(getNameOfDeclaration(o), Diagnostics.Overload_signatures_must_all_be_exported_or_non_exported);
                            }
                            else if (deviation & 2 /* Ambient */) {
                                error(getNameOfDeclaration(o), Diagnostics.Overload_signatures_must_all_be_ambient_or_non_ambient);
                            }
                            else if (deviation & (8 /* Private */ | 16 /* Protected */)) {
                                error(getNameOfDeclaration(o) || o, Diagnostics.Overload_signatures_must_all_be_public_private_or_protected);
                            }
                            else if (deviation & 256 /* Abstract */) {
                                error(getNameOfDeclaration(o), Diagnostics.Overload_signatures_must_all_be_abstract_or_non_abstract);
                            }
                        });
                    }
                }