function newNodeTypeTester(type) {
        return {
            test: (node) => node.type === type,
        };
    }