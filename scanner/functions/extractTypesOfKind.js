function extractTypesOfKind(type, kind) {
                return filterType(type, (t) => (t.flags & kind) !== 0);
            }