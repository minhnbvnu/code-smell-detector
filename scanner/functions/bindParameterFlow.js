function bindParameterFlow(node) {
                bindEach(node.modifiers);
                bind(node.dotDotDotToken);
                bind(node.questionToken);
                bind(node.type);
                bindInitializer(node.initializer);
                bind(node.name);
            }