function findVariable(initialScope, nameOrNode) {
        let name = "";
        let scope = initialScope;
        if (typeof nameOrNode === "string") {
            name = nameOrNode;
        }
        else {
            name = nameOrNode.name;
            scope = getInnermostScope(scope, nameOrNode);
        }
        while (scope != null) {
            const variable = scope.set.get(name);
            if (variable != null) {
                return variable;
            }
            scope = scope.upper;
        }
        return null;
    }