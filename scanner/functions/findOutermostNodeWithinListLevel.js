function findOutermostNodeWithinListLevel(node) {
            let current = node;
            while (current && current.parent && current.parent.end === node.end && !isListElement(current.parent, current)) {
                current = current.parent;
            }
            return current;
        }