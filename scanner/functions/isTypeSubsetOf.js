function isTypeSubsetOf(source, target) {
                return source === target || target.flags & 1048576 /* Union */ && isTypeSubsetOfUnion(source, target);
            }