function eachIsUnionContaining(types, flag) {
                return every(types, (t) => !!(t.flags & 1048576 /* Union */) && some(t.types, (tt) => !!(tt.flags & flag)));
            }