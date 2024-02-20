function updateBindingElement(node, dotDotDotToken, propertyName, name, initializer) {
                return node.propertyName !== propertyName || node.dotDotDotToken !== dotDotDotToken || node.name !== name || node.initializer !== initializer ? update(createBindingElement(dotDotDotToken, propertyName, name, initializer), node) : node;
            }