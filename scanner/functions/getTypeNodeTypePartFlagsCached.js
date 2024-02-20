function getTypeNodeTypePartFlagsCached(typeNode) {
                const existing = typesCache.get(typeNode);
                if (existing) {
                    return existing;
                }
                const created = getTypeNodeTypePartFlags(typeNode);
                typesCache.set(typeNode, created);
                return created;
            }