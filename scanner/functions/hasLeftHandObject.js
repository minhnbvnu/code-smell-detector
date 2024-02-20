function hasLeftHandObject(node) {
        /*
         * ({}).hasOwnProperty.call(obj, prop) - `true`
         * ({ foo }.hasOwnProperty.call(obj, prop)) - `false`, object literal should be empty
         */
        if (node.object.type === "ObjectExpression" && node.object.properties.length === 0) {
            return true;
        }
        const objectNodeToCheck = node.object.type === "MemberExpression" && astUtils.getStaticPropertyName(node.object) === "prototype" ? node.object.object : node.object;
        if (objectNodeToCheck.type === "Identifier" && objectNodeToCheck.name === "Object") {
            return true;
        }
        return false;
    }