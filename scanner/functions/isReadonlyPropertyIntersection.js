function isReadonlyPropertyIntersection(type, name, checker) {
        return someTypePart(type, type_1.isIntersectionType, (t) => {
            const prop = getPropertyOfType(t, name);
            if (prop === undefined)
                return false;
            if (prop.flags & ts.SymbolFlags.Transient) {
                if (/^(?:[1-9]\d*|0)$/.test(name) && type_1.isTupleTypeReference(t))
                    return t.target.readonly;
                switch (isReadonlyPropertyFromMappedType(t, name, checker)) {
                    case true:
                        return true;
                    case false:
                        return false;
                    default:
                    // `undefined` falls through
                }
            }
            return (
            // members of namespace import
            util_1.isSymbolFlagSet(prop, ts.SymbolFlags.ValueModule) ||
                // we unwrapped every mapped type, now we can check the actual declarations
                symbolHasReadonlyDeclaration(prop, checker));
        });
    }