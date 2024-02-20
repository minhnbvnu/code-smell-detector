function inspectImportStatement(emitted) {
            let node = emitted.node;

            if (emitted.exit) {
                return;
            }

            let code = sourceCode.getText(node);

            //ensure there's no whitespace or comments before semicolon
            (code [code.length - 1] === ";" && /(\s|\/)/.test(code [code.length - 2])) && context.report({
                node: node,
                location: {
                    column: code.length - 2
                },
                message: "There should be no whitespace or comments before the semicolon."
            });
        }