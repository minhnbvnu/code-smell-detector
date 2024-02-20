function getPropertyOfObjectType(type, name) {
                if (type.flags & 524288 /* Object */) {
                    const resolved = resolveStructuredTypeMembers(type);
                    const symbol = resolved.members.get(name);
                    if (symbol && symbolIsValue(symbol)) {
                        return symbol;
                    }
                }
            }