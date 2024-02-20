function getAncestors(node) {
        const ancestorsStartingAtParent = [];
        for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
            ancestorsStartingAtParent.push(ancestor);
        }
        return ancestorsStartingAtParent.reverse();
    }