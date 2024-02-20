function getPropertyAssignmentAliasLikeExpression(node) {
            return node.kind === 300 /* ShorthandPropertyAssignment */ ? node.name : node.kind === 299 /* PropertyAssignment */ ? node.initializer : node.parent.right;
        }