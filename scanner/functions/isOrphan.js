function isOrphan(node) {
        return !dom.arrayContains(rootContainerNodeTypes, node.nodeType) && !getDocumentOrFragmentContainer(node, true);
    }