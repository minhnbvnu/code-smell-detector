function enterFunction(node) {
                scopeInfoStack.push({
                    hasAsync: node.async,
                    owningFunc: node,
                });
            }