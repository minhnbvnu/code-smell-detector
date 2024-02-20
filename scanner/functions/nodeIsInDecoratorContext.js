function nodeIsInDecoratorContext(node) {
            while (node && isExpression(node)) {
                node = node.parent;
            }
            return node && node.kind === 167 /* Decorator */;
        }