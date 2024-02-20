function getMembersOrProperties(node) {
            return isObjectLiteralExpression(node) ? node.properties : node.members;
        }