function inspectForStatement(emitted) {
            let node = emitted.node,
                lastNodeOnStartingLine = node.update || node.test || node.init;
            let startingLine = sourceCode.getLine(node);

            if (emitted.exit) {
                return;
            }

            /**
			 * If no BlockStatement found, report. Otherwise:
			 * Check the last non-null node amongst 'init', 'test' and 'update'
			 * If such a node doesn't exist and '{' is on diff line, report.
			 * If such a node exists and it exists on the same line as 'for' and '{' is on diff line, report
			 */
            if (node.body.type !== "BlockStatement") {
                return context.report({
                    node: node,
                    message: "Expected '{' after for statement."
                });
            }

            if (
                (
                    !lastNodeOnStartingLine ||
					startingLine === sourceCode.getEndingLine(lastNodeOnStartingLine)
                ) &&
				startingLine !== sourceCode.getLine(node.body)
            ) {
                return context.report({
                    node: node.body,
                    message: "Opening brace must be on the same line as the for statement."
                });
            }

            if (!/^[^\s\/] $/.test(sourceCode.getPrevChars(node.body, 2))) {
                context.report({
                    node: node.body,
                    message: "Only use single space between for statement & opening brace."
                });
            }
        }