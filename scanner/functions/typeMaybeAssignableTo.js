function typeMaybeAssignableTo(source, target) {
                if (!(source.flags & 1048576 /* Union */)) {
                    return isTypeAssignableTo(source, target);
                }
                for (const t of source.types) {
                    if (isTypeAssignableTo(t, target)) {
                        return true;
                    }
                }
                return false;
            }