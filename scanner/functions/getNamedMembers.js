function getNamedMembers(members) {
                let result;
                members.forEach((symbol, id) => {
                    if (isNamedMember(symbol, id)) {
                        (result || (result = [])).push(symbol);
                    }
                });
                return result || emptyArray;
            }