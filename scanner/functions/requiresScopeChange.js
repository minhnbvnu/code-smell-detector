function requiresScopeChange(node) {
                    return requiresScopeChangeWorker(node.name) || !!node.initializer && requiresScopeChangeWorker(node.initializer);
                }