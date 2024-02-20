function indexNodeTypes(parent, ticker) {
        // add .typeIndex to tree node types for lookup table
        var key, child;
        for (key in parent) {
            /* eslint guard-for-in: 0 */
            child = parent[key];
            switch (typeof child) {
                case 'function':
                    // ignore bound functions directly on tree which do not have a prototype
                    // or aren't nodes
                    if (child.prototype && child.prototype.type) {
                        child.prototype.typeIndex = ticker++;
                    }
                    break;
                case 'object':
                    ticker = indexNodeTypes(child, ticker);
                    break;
            }
        }
        return ticker;
    }