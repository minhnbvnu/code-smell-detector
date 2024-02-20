function getModuleInstanceState(node, visited) {
            if (node.body && !node.body.parent) {
                setParent(node.body, node);
                setParentRecursive(node.body, 
                /*incremental*/
                false);
            }
            return node.body ? getModuleInstanceStateCached(node.body, visited) : 1 /* Instantiated */;
        }