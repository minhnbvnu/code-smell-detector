function maybeTypeOfKind(type, kind) {
                if (type.flags & kind) {
                    return true;
                }
                if (type.flags & 3145728 /* UnionOrIntersection */) {
                    const types = type.types;
                    for (const t of types) {
                        if (maybeTypeOfKind(t, kind)) {
                            return true;
                        }
                    }
                }
                return false;
            }