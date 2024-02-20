function getVisitorKeysForNode(allVisitorKeys, node) {
        const keys = allVisitorKeys[node.type];
        return (keys !== null && keys !== void 0 ? keys : []);
    }