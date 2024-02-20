function setStructuredTypeMembers(type, members, callSignatures, constructSignatures, indexInfos) {
                const resolved = type;
                resolved.members = members;
                resolved.properties = emptyArray;
                resolved.callSignatures = callSignatures;
                resolved.constructSignatures = constructSignatures;
                resolved.indexInfos = indexInfos;
                if (members !== emptySymbols)
                    resolved.properties = getNamedMembers(members);
                return resolved;
            }