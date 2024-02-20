function deleteDestructuringElements(changes, sourceFile, node) {
            forEach(node.elements, (n) => changes.delete(sourceFile, n));
        }