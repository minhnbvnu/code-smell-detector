function isDeeplyNestedType(type, stack, depth, maxDepth = 3) {
                if (depth >= maxDepth) {
                    if (type.flags & 2097152 /* Intersection */) {
                        return some(type.types, (t) => isDeeplyNestedType(t, stack, depth, maxDepth));
                    }
                    const identity2 = getRecursionIdentity(type);
                    let count = 0;
                    let lastTypeId = 0;
                    for (let i = 0; i < depth; i++) {
                        const t = stack[i];
                        if (t.flags & 2097152 /* Intersection */ ? some(t.types, (u) => getRecursionIdentity(u) === identity2) : getRecursionIdentity(t) === identity2) {
                            if (t.id >= lastTypeId) {
                                count++;
                                if (count >= maxDepth) {
                                    return true;
                                }
                            }
                            lastTypeId = t.id;
                        }
                    }
                }
                return false;
            }