function checkIndentInFunctionBlock(node) {
                /*
                 * Search first caller in chain.
                 * Ex.:
                 *
                 * Models <- Identifier
                 *   .User
                 *   .find()
                 *   .exec(function() {
                 *   // function body
                 * });
                 *
                 * Looks for 'Models'
                 */
                const calleeNode = node.parent; // FunctionExpression
                let indent;
                if (calleeNode.parent &&
                    (calleeNode.parent.type === "Property" ||
                        calleeNode.parent.type === "ArrayExpression")) {
                    // If function is part of array or object, comma can be put at left
                    indent = getNodeIndent(calleeNode, false).goodChar;
                }
                else {
                    // If function is standalone, simple calculate indent
                    indent = getNodeIndent(calleeNode).goodChar;
                }
                if (calleeNode.parent.type === "CallExpression") {
                    const calleeParent = calleeNode.parent;
                    if (calleeNode.type !== "FunctionExpression" && calleeNode.type !== "ArrowFunctionExpression") {
                        if (calleeParent && calleeParent.loc.start.line < node.loc.start.line) {
                            indent = getNodeIndent(calleeParent).goodChar;
                        }
                    }
                    else {
                        if (isArgBeforeCalleeNodeMultiline(calleeNode) &&
                            calleeParent.callee.loc.start.line === calleeParent.callee.loc.end.line &&
                            !isNodeFirstInLine(calleeNode)) {
                            indent = getNodeIndent(calleeParent).goodChar;
                        }
                    }
                }
                /*
                 * function body indent should be indent + indent size, unless this
                 * is a FunctionDeclaration, FunctionExpression, or outer IIFE and the corresponding options are enabled.
                 */
                let functionOffset = indentSize;
                if (options.outerIIFEBody !== null && isOuterIIFE(calleeNode)) {
                    functionOffset = options.outerIIFEBody * indentSize;
                }
                else if (calleeNode.type === "FunctionExpression") {
                    functionOffset = options.FunctionExpression.body * indentSize;
                }
                else if (calleeNode.type === "FunctionDeclaration") {
                    functionOffset = options.FunctionDeclaration.body * indentSize;
                }
                indent += functionOffset;
                // check if the node is inside a variable
                const parentVarNode = getVariableDeclaratorNode(node);
                if (parentVarNode && isNodeInVarOnTop(node, parentVarNode)) {
                    indent += indentSize * options.VariableDeclarator[parentVarNode.parent.kind];
                }
                if (node.body.length > 0) {
                    checkNodesIndent(node.body, indent);
                }
                checkLastNodeLineIndent(node, indent - functionOffset);
            }