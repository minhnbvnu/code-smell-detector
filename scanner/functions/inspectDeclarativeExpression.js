function inspectDeclarativeExpression(emitted) {
            let node = emitted.node, variableName = node.name;

            if (emitted.exit) {
                return;
            }

            disallowedNames.forEach(function(disallowedName) {
                if (variableName === disallowedName) {
                    context.report({
                        node: node,
                        message: "Using '" + variableName + "' for a variable name should be avoided."
                    });
                }
            });
        }