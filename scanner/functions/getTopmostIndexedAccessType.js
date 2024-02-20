function getTopmostIndexedAccessType(top) {
                    if (isIndexedAccessTypeNode(top.objectType)) {
                        return getTopmostIndexedAccessType(top.objectType);
                    }
                    return top;
                }