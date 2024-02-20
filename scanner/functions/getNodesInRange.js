function getNodesInRange(range, nodeTypes, filter) {
        //log.info("getNodesInRange, " + nodeTypes.join(","));
        var filterNodeTypes = !!(nodeTypes && nodeTypes.length), regex;
        var filterExists = !!filter;
        if (filterNodeTypes) {
            regex = new RegExp("^(" + nodeTypes.join("|") + ")$");
        }

        var nodes = [];
        iterateSubtree(new RangeIterator(range, false), function(node) {
            if ((!filterNodeTypes || regex.test(node.nodeType)) && (!filterExists || filter(node))) {
                nodes.push(node);
            }
        });
        return nodes;
    }