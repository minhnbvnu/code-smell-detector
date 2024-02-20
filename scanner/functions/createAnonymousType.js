function createAnonymousType(symbol, members, callSignatures, constructSignatures, indexInfos) {
                return setStructuredTypeMembers(createObjectType(16 /* Anonymous */, symbol), members, callSignatures, constructSignatures, indexInfos);
            }