function getStringLiteralTypes(type, uniques = /* @__PURE__ */ new Map()) {
            if (!type)
                return emptyArray;
            type = skipConstraint(type);
            return type.isUnion() ? flatMap(type.types, (t) => getStringLiteralTypes(t, uniques)) : type.isStringLiteral() && !(type.flags & 1024 /* EnumLiteral */) && addToSeen(uniques, type.value) ? [type] : emptyArray;
        }