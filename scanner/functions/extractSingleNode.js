function extractSingleNode(nodes) {
            Debug.assert(nodes.length <= 1, "Too many nodes written to output.");
            return singleOrUndefined(nodes);
        }