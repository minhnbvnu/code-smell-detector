function substituteMetaProperty(node) {
                if (isImportMeta(node)) {
                    return factory2.createPropertyAccessExpression(contextObject, factory2.createIdentifier("meta"));
                }
                return node;
            }