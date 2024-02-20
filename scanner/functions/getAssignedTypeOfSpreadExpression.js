function getAssignedTypeOfSpreadExpression(node) {
                return getTypeOfDestructuredSpreadExpression(getAssignedType(node.parent));
            }