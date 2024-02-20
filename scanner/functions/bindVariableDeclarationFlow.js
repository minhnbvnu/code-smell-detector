function bindVariableDeclarationFlow(node) {
                bindEachChild(node);
                if (node.initializer || isForInOrOfStatement(node.parent.parent)) {
                    bindInitializedVariableFlow(node);
                }
            }