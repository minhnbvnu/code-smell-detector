function transformJsxAttributeToObjectLiteralElement(node) {
                const name = getAttributeName(node);
                const expression = transformJsxAttributeInitializer(node.initializer);
                return factory2.createPropertyAssignment(name, expression);
            }