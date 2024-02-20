function isAnonymousClassNeedingAssignedName(node) {
                return isClassExpression(node) && !node.name && isDecoratedClassLike(node);
            }