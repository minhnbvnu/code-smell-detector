function pathToDescendant(node, descendant) {
                return pathToAncestor(descendant, node).reverse();
            }