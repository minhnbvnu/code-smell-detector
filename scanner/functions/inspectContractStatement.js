function inspectContractStatement(emitted) {
            let node = emitted.node,
                code = sourceCode.getTextOnLine(sourceCode.getLine(node));

            if (emitted.exit) {
                return;
            }

            (!/[^\s\/] {/.test(code)) && context.report({
                node: node,
                message: `'${node.name}': Declaration & opening brace must be separated by single space only.`
            });
        }