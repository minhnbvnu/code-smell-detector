function getOutgoingCalls(program, declaration) {
            if (declaration.flags & 16777216 /* Ambient */ || isMethodSignature(declaration)) {
                return [];
            }
            return group(collectCallSites(program, declaration), getCallSiteGroupKey, (entries) => convertCallSiteGroupToOutgoingCall(program, entries));
        }