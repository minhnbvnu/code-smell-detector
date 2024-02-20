function walkUpOuterExpressions(node, kinds = 15 /* All */) {
            let parent2 = node.parent;
            while (isOuterExpression(parent2, kinds)) {
                parent2 = parent2.parent;
                Debug.assert(parent2);
            }
            return parent2;
        }