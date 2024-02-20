function inspectStructDeclaration(emitted) {
            let node = emitted.node,
                code = sourceCode.getText(node).replace("struct " + node.name, "");

            if (emitted.exit) {
                return;
            }

            (code.slice(0, 2) !== " {") && context.report({
                node: node,
                message: `'${node.name}': Declaration & opening brace must be separated by single space only.`
            });
        }