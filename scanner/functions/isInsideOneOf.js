function isInsideOneOf(ref, nodes) {
            for (const node of nodes) {
                if (isInside(ref.identifier, node)) {
                    return true;
                }
            }
            return false;
        }