function resolveUnionTypeMembers(type) {
                const callSignatures = getUnionSignatures(map(type.types, (t) => t === globalFunctionType ? [unknownSignature] : getSignaturesOfType(t, 0 /* Call */)));
                const constructSignatures = getUnionSignatures(map(type.types, (t) => getSignaturesOfType(t, 1 /* Construct */)));
                const indexInfos = getUnionIndexInfos(type.types);
                setStructuredTypeMembers(type, emptySymbols, callSignatures, constructSignatures, indexInfos);
            }