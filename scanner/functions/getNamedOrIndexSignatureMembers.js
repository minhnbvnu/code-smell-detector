function getNamedOrIndexSignatureMembers(members) {
                const result = getNamedMembers(members);
                const index = getIndexSymbolFromSymbolTable(members);
                return index ? concatenate(result, [index]) : result;
            }