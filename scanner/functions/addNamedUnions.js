function addNamedUnions(namedUnions, types) {
                for (const t of types) {
                    if (t.flags & 1048576 /* Union */) {
                        const origin = t.origin;
                        if (t.aliasSymbol || origin && !(origin.flags & 1048576 /* Union */)) {
                            pushIfUnique(namedUnions, t);
                        }
                        else if (origin && origin.flags & 1048576 /* Union */) {
                            addNamedUnions(namedUnions, origin.types);
                        }
                    }
                }
            }