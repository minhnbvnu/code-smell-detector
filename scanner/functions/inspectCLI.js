function inspectCLI(emitted) {
            let node = emitted.node,
                sourceCode = context.getSourceCode(), text = sourceCode.getText(node);

            if (emitted.exit) {
                return;
            }

            if (!node.body.length) {
                report(node, { column: text.indexOf("{") });
            }
        }