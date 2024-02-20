function getTupleTargetType(elementFlags, readonly, namedMemberDeclarations) {
                if (elementFlags.length === 1 && elementFlags[0] & 4 /* Rest */) {
                    return readonly ? globalReadonlyArrayType : globalArrayType;
                }
                const key = map(elementFlags, (f) => f & 1 /* Required */ ? "#" : f & 2 /* Optional */ ? "?" : f & 4 /* Rest */ ? "." : "*").join() + (readonly ? "R" : "") + (namedMemberDeclarations && namedMemberDeclarations.length ? "," + map(namedMemberDeclarations, getNodeId).join(",") : "");
                let type = tupleTypes.get(key);
                if (!type) {
                    tupleTypes.set(key, type = createTupleTargetType(elementFlags, readonly, namedMemberDeclarations));
                }
                return type;
            }