function inspectModifierDeclaration(emitted) {
            let node = emitted.node;

            if (emitted.exit) {
                return;
            }

            //If parameters are specified, ensure appropriate spacing surrounding commas
            let params = node.params;

            if (params && params.length > 1) {
                params.slice(0, -1).forEach(function(arg) {
                    sourceCode.getNextChar(arg) !== "," && context.report({
                        node: arg,
                        location: {
                            column: sourceCode.getEndingColumn(arg) + 1
                        },
                        message: "All arguments (except the last one) must be immediately followed by a comma."
                    });
                });
            }
        }