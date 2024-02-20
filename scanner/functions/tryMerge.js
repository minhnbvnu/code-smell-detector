function tryMerge(a, b, bIndex, parent2) {
            if (tryMergeEs5Class(a, b, bIndex, parent2)) {
                return true;
            }
            if (shouldReallyMerge(a.node, b.node, parent2)) {
                merge(a, b);
                return true;
            }
            return false;
        }