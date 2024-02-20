function getLastChild(node) {
            let lastChild;
            forEachChild(node, (child) => {
                if (nodeIsPresent(child))
                    lastChild = child;
            }, (children) => {
                for (let i = children.length - 1; i >= 0; i--) {
                    if (nodeIsPresent(children[i])) {
                        lastChild = children[i];
                        break;
                    }
                }
            });
            return lastChild;
        }