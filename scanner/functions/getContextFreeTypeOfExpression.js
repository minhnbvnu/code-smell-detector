function getContextFreeTypeOfExpression(node) {
                const links = getNodeLinks(node);
                if (links.contextFreeType) {
                    return links.contextFreeType;
                }
                pushContextualType(node, anyType, 
                /*isCache*/
                false);
                const type = links.contextFreeType = checkExpression(node, 4 /* SkipContextSensitive */);
                popContextualType();
                return type;
            }