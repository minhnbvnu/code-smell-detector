function blockIndentationCheck(node) {
                // Skip inline blocks
                if (isSingleLineNode(node)) {
                    return;
                }
                if (node.parent && (node.parent.type === "FunctionExpression" ||
                    node.parent.type === "FunctionDeclaration" ||
                    node.parent.type === "ArrowFunctionExpression")) {
                    checkIndentInFunctionBlock(node);
                    return;
                }
                let indent;
                let nodesToCheck = [];
                /*
                 * For this statements we should check indent from statement beginning,
                 * not from the beginning of the block.
                 */
                const statementsWithProperties = [
                    "IfStatement", "WhileStatement", "ForStatement", "ForInStatement", "ForOfStatement", "DoWhileStatement", "ClassDeclaration", "TryStatement"
                ];
                if (node.parent && statementsWithProperties.includes(node.parent.type) && isNodeBodyBlock(node)) {
                    indent = getNodeIndent(node.parent).goodChar;
                }
                else if (node.parent && node.parent.type === "CatchClause") {
                    indent = getNodeIndent(node.parent.parent).goodChar;
                }
                else {
                    indent = getNodeIndent(node).goodChar;
                }
                if (node.type === "IfStatement" && node.consequent.type !== "BlockStatement") {
                    nodesToCheck = [node.consequent];
                }
                else if (Array.isArray(node.body)) {
                    nodesToCheck = node.body;
                }
                else {
                    nodesToCheck = [node.body];
                }
                if (nodesToCheck.length > 0) {
                    checkNodesIndent(nodesToCheck, indent + indentSize);
                }
                if (node.type === "BlockStatement") {
                    checkLastNodeLineIndent(node, indent);
                }
            }