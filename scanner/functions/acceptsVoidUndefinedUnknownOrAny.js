function acceptsVoidUndefinedUnknownOrAny(t) {
                return !!(t.flags & (16384 /* Void */ | 32768 /* Undefined */ | 2 /* Unknown */ | 1 /* Any */));
            }