function containsYield(node) {
                return !!node && (node.transformFlags & 1048576 /* ContainsYield */) !== 0;
            }