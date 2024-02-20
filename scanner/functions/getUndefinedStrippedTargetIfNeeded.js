function getUndefinedStrippedTargetIfNeeded(source2, target2) {
                    if (source2.flags & 1048576 /* Union */ && target2.flags & 1048576 /* Union */ && !(source2.types[0].flags & 32768 /* Undefined */) && target2.types[0].flags & 32768 /* Undefined */) {
                        return extractTypesOfKind(target2, ~32768 /* Undefined */);
                    }
                    return target2;
                }