function forEachPropertyOfType(type, action) {
                type = getReducedApparentType(type);
                if (type.flags & 3670016 /* StructuredType */) {
                    resolveStructuredTypeMembers(type).members.forEach((symbol, escapedName) => {
                        if (isNamedMember(symbol, escapedName)) {
                            action(symbol, escapedName);
                        }
                    });
                }
            }