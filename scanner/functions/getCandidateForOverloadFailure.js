function getCandidateForOverloadFailure(node, candidates, args, hasCandidatesOutArray, checkMode) {
                Debug.assert(candidates.length > 0);
                checkNodeDeferred(node);
                return hasCandidatesOutArray || candidates.length === 1 || candidates.some((c) => !!c.typeParameters) ? pickLongestCandidateSignature(node, candidates, args, checkMode) : createUnionOfSignaturesForOverloadFailure(candidates);
            }