function isOrHasGenericConditional(type) {
                return !!(type.flags & 16777216 /* Conditional */ || type.flags & 2097152 /* Intersection */ && some(type.types, isOrHasGenericConditional));
            }