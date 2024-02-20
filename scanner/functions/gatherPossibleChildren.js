function gatherPossibleChildren(node) {
            const children = [];
            forEachChild(node, addWorkItem, addWorkItem);
            return children;
            function addWorkItem(n) {
                children.unshift(n);
            }
        }