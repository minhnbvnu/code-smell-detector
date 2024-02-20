function inspectIdentifier(emitted) {
            if (!emitted.exit) {
                let node = emitted.node,
                    sourceCode = context.getSourceCode();

                if (
                    allVariableDeclarations [node.name] &&
					sourceCode.getParent(node).type !== "VariableDeclarator"
                ) {
                    delete allVariableDeclarations [node.name];
                }
            }
        }