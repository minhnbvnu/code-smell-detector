function inspectWhileStatement(emitted) {
            let node = emitted.node,
                startingLine = sourceCode.getLine(node);

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
                    message: "Expected '{' after while statement."
                });
            }

            if (
                startingLine === sourceCode.getEndingLine(node.test) &&
				startingLine !== sourceCode.getLine(node.body)
            ) {
                return context.report({
                    node: node.body,
                    message: "Opening brace must be on the same line as the while statement."
                });
            }

            if (!/^[^\s\/] $/.test(sourceCode.getPrevChars(node.body, 2))) {
                context.report({
                    node: node.body,
                    message: "Only use single space between while declaration & opening brace."
                });
            }
        }