function getCandidateOrTypeInfo({ invocation, argumentCount }, checker, sourceFile, startingToken, onlyUseSyntacticOwners) {
            switch (invocation.kind) {
                case 0 /* Call */: {
                    if (onlyUseSyntacticOwners && !isSyntacticOwner(startingToken, invocation.node, sourceFile)) {
                        return void 0;
                    }
                    const candidates = [];
                    const resolvedSignature = checker.getResolvedSignatureForSignatureHelp(invocation.node, candidates, argumentCount);
                    return candidates.length === 0 ? void 0 : { kind: 0 /* Candidate */, candidates, resolvedSignature };
                }
                case 1 /* TypeArgs */: {
                    const { called } = invocation;
                    if (onlyUseSyntacticOwners && !containsPrecedingToken(startingToken, sourceFile, isIdentifier(called) ? called.parent : called)) {
                        return void 0;
                    }
                    const candidates = getPossibleGenericSignatures(called, argumentCount, checker);
                    if (candidates.length !== 0)
                        return { kind: 0 /* Candidate */, candidates, resolvedSignature: first(candidates) };
                    const symbol = checker.getSymbolAtLocation(called);
                    return symbol && { kind: 1 /* Type */, symbol };
                }
                case 2 /* Contextual */:
                    return { kind: 0 /* Candidate */, candidates: [invocation.signature], resolvedSignature: invocation.signature };
                default:
                    return Debug.assertNever(invocation);
            }
        }