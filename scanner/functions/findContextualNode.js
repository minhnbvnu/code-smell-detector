function findContextualNode(node, includeCaches) {
                for (let i = contextualTypeCount - 1; i >= 0; i--) {
                    if (node === contextualTypeNodes[i] && (includeCaches || !contextualIsCache[i])) {
                        return i;
                    }
                }
                return -1;
            }