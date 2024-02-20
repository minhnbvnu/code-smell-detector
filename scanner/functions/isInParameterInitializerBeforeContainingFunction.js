function isInParameterInitializerBeforeContainingFunction(node) {
                let inBindingInitializer = false;
                while (node.parent && !isFunctionLike(node.parent)) {
                    if (isParameter(node.parent) && (inBindingInitializer || node.parent.initializer === node)) {
                        return true;
                    }
                    if (isBindingElement(node.parent) && node.parent.initializer === node) {
                        inBindingInitializer = true;
                    }
                    node = node.parent;
                }
                return false;
            }