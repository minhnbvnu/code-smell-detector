function getPathToRoot(node) {
        const path = [];
        let current = node;
        do {
            path.push(current);
            current = current.parent;
        } while (current);
        return path;
    }