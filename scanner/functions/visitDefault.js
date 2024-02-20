function visitDefault(node) {
                return visitEachChild(node, visitor, context);
            }