function checkQuestionTokenAgreementBetweenOverloads(overloads, implementation, someHaveQuestionToken2, allHaveQuestionToken2) {
                    if (someHaveQuestionToken2 !== allHaveQuestionToken2) {
                        const canonicalHasQuestionToken = hasQuestionToken(getCanonicalOverload(overloads, implementation));
                        forEach(overloads, (o) => {
                            const deviation = hasQuestionToken(o) !== canonicalHasQuestionToken;
                            if (deviation) {
                                error(getNameOfDeclaration(o), Diagnostics.Overload_signatures_must_all_be_optional_or_required);
                            }
                        });
                    }
                }