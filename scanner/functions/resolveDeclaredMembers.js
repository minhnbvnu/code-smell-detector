function resolveDeclaredMembers(type) {
                if (!type.declaredProperties) {
                    const symbol = type.symbol;
                    const members = getMembersOfSymbol(symbol);
                    type.declaredProperties = getNamedMembers(members);
                    type.declaredCallSignatures = emptyArray;
                    type.declaredConstructSignatures = emptyArray;
                    type.declaredIndexInfos = emptyArray;
                    type.declaredCallSignatures = getSignaturesOfSymbol(members.get("__call" /* Call */));
                    type.declaredConstructSignatures = getSignaturesOfSymbol(members.get("__new" /* New */));
                    type.declaredIndexInfos = getIndexInfosOfSymbol(symbol);
                }
                return type;
            }