function getTypeOfInitializer(node) {
                const links = getNodeLinks(node);
                return links.resolvedType || getTypeOfExpression(node);
            }