function getTypeFromThisTypeNode(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    links.resolvedType = getThisType(node);
                }
                return links.resolvedType;
            }