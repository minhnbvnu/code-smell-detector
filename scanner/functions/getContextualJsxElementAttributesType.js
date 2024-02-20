function getContextualJsxElementAttributesType(node, contextFlags) {
                if (isJsxOpeningElement(node) && contextFlags !== 4 /* Completions */) {
                    const index = findContextualNode(node.parent, 
                    /*includeCaches*/
                    !contextFlags);
                    if (index >= 0) {
                        return contextualTypes[index];
                    }
                }
                return getContextualTypeForArgumentAtIndex(node, 0);
            }