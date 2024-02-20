function bindBindingElementFlow(node) {
                bind(node.dotDotDotToken);
                bind(node.propertyName);
                bindInitializer(node.initializer);
                bind(node.name);
            }