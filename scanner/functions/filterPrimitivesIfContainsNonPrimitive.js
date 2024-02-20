function filterPrimitivesIfContainsNonPrimitive(type) {
                if (maybeTypeOfKind(type, 67108864 /* NonPrimitive */)) {
                    const result = filterType(type, (t) => !(t.flags & 134348796 /* Primitive */));
                    if (!(result.flags & 131072 /* Never */)) {
                        return result;
                    }
                }
                return type;
            }