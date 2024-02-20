function inspectBlockStatement(emitted) {
            let node = emitted.node, blockBody = node.body,
                lastBlockItem = blockBody.slice(-1) [0];	//if block is empty, this becomes undefined

            //if block spans over multiple lines or is child of a function declaration, below rules don't apply
            if (emitted.exit ||
				(lastBlockItem && sourceCode.getLine(node) !== sourceCode.getEndingLine(lastBlockItem)) ||
				["FunctionDeclaration", "ConstructorDeclaration"].includes(node.parent.type)
            ) {
                return;
            }

            //for a 0-item block, ensure that block node's code is simply '{}'
            if (!blockBody.length) {
                let nodeCode = sourceCode.getText(node);

                (nodeCode !== "{}") && context.report({
                    node: node,
                    message: "An empty block shouldn't have any whitespace or comments between the braces, i.e., '{}'."
                });

                return;
            }

            let charBeforeFirstItem = sourceCode.getPrevChar(blockBody [0]),
                charAfterLastItem = sourceCode.getNextChar(lastBlockItem);

            (charBeforeFirstItem !== "{") && context.report({
                node: blockBody [0],
                location: {
                    column: sourceCode.getColumn(blockBody [0]) - 1
                },
                message: "There should be no whitespace or comments between the opening brace '{' and first item."
            });

            (charAfterLastItem !== "}") && context.report({
                node: lastBlockItem,
                location: {
                    column: sourceCode.getEndingColumn(lastBlockItem) + 1
                },
                message: "There should be no whitespace or comments between the last item and closing brace '}'."
            });
        }