function isTypeAssignableTo(checker, type, flags) {
        flags |= ts.TypeFlags.Any;
        let typeParametersSeen;
        return (function check(t) {
            if (type_1.isTypeParameter(t) && t.symbol !== undefined && t.symbol.declarations !== undefined) {
                if (typeParametersSeen === undefined) {
                    typeParametersSeen = new Set([t]);
                }
                else if (!typeParametersSeen.has(t)) {
                    typeParametersSeen.add(t);
                }
                else {
                    return false;
                }
                const declaration = t.symbol.declarations[0];
                if (declaration.constraint === undefined)
                    return true; // TODO really?
                return check(checker.getTypeFromTypeNode(declaration.constraint));
            }
            if (type_1.isUnionType(t))
                return t.types.every(check);
            if (type_1.isIntersectionType(t))
                return t.types.some(check);
            return util_1.isTypeFlagSet(t, flags);
        })(type);
    }