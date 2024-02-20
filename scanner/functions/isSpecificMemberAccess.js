function isSpecificMemberAccess(node, objectName, propertyName) {
        const checkNode = skipChainExpression(node);
        if (checkNode.type !== "MemberExpression") {
            return false;
        }
        if (objectName && !isSpecificId(checkNode.object, objectName)) {
            return false;
        }
        if (propertyName) {
            const actualPropertyName = getStaticPropertyName(checkNode);
            if (typeof actualPropertyName !== "string" || !checkText(actualPropertyName, propertyName)) {
                return false;
            }
        }
        return true;
    }