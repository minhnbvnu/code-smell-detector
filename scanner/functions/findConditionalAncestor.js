function findConditionalAncestor(node) {
                let currentAncestor = node;
                do {
                    if (isConditionalTestExpression(currentAncestor)) {
                        return currentAncestor.parent;
                    }
                } while ((currentAncestor = currentAncestor.parent) && !astUtils.isFunction(currentAncestor));
                return null;
            }