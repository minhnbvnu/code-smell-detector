function addImplementationSuccessElaboration(failed, diagnostic) {
                    var _a2, _b;
                    const oldCandidatesForArgumentError = candidatesForArgumentError;
                    const oldCandidateForArgumentArityError = candidateForArgumentArityError;
                    const oldCandidateForTypeArgumentError = candidateForTypeArgumentError;
                    const failedSignatureDeclarations = ((_b = (_a2 = failed.declaration) == null ? void 0 : _a2.symbol) == null ? void 0 : _b.declarations) || emptyArray;
                    const isOverload = failedSignatureDeclarations.length > 1;
                    const implDecl = isOverload ? find(failedSignatureDeclarations, (d) => isFunctionLikeDeclaration(d) && nodeIsPresent(d.body)) : void 0;
                    if (implDecl) {
                        const candidate = getSignatureFromDeclaration(implDecl);
                        const isSingleNonGenericCandidate2 = !candidate.typeParameters;
                        if (chooseOverload([candidate], assignableRelation, isSingleNonGenericCandidate2)) {
                            addRelatedInfo(diagnostic, createDiagnosticForNode(implDecl, Diagnostics.The_call_would_have_succeeded_against_this_implementation_but_implementation_signatures_of_overloads_are_not_externally_visible));
                        }
                    }
                    candidatesForArgumentError = oldCandidatesForArgumentError;
                    candidateForArgumentArityError = oldCandidateForArgumentArityError;
                    candidateForTypeArgumentError = oldCandidateForTypeArgumentError;
                }