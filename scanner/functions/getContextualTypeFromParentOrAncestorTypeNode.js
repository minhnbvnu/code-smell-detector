function getContextualTypeFromParentOrAncestorTypeNode(node, checker) {
            if (node.flags & (8388608 /* JSDoc */ & ~262144 /* JavaScriptFile */))
                return void 0;
            const contextualType = getContextualTypeFromParent(node, checker);
            if (contextualType)
                return contextualType;
            const ancestorTypeNode = getAncestorTypeNode(node);
            return ancestorTypeNode && checker.getTypeAtLocation(ancestorTypeNode);
        }