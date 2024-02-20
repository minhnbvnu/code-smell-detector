function simpleTraverse(startingNode, options, setParentPointers = false) {
        new SimpleTraverser(options, setParentPointers).traverse(startingNode, undefined);
    }