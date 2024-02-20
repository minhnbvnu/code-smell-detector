function forEachEnclosingBlockScopeContainer(node, cb) {
            let container = getEnclosingBlockScopeContainer(node);
            while (container) {
                cb(container);
                container = getEnclosingBlockScopeContainer(container);
            }
        }