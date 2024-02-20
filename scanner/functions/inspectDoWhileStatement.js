function inspectDoWhileStatement(emitted) {
            let node = emitted.node;

            if (emitted.exit) {
                return;
            }

            /**
			 * If no BlockStatement found, report. Otherwise:
			 * If 'while' and node.test exist on same line and '{' is on diff line, report
			 */
            if (node.body.type !== "BlockStatement") {
                return context.report({
                    node: node,
                    message: "Expected '{' after do token."
                });
            }

            if (!/^[^\s\/] $/.test(sourceCode.getPrevChars(node.body, 2))) {
                context.report({
                    node: node.body,
                    message: "Only use single space between 'do' & opening brace."
                });
            }
        }