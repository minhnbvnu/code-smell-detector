function isClassStaticInitializerScope(scope) {
        if (scope.type === "class-static-block") {
            return true;
        }
        if (scope.type === "class-field-initializer") {
            // `scope.block` is PropertyDefinition#value node
            const propertyDefinition = scope.block.parent;
            return propertyDefinition.static;
        }
        return false;
    }