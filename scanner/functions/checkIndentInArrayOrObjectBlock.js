function checkIndentInArrayOrObjectBlock(node) {
                // Skip inline
                if (isSingleLineNode(node)) {
                    return;
                }
                let elements = (node.type === "ArrayExpression") ? node.elements : node.properties;
                // filter out empty elements example would be [ , 2] so remove first element as espree considers it as null
                elements = elements.filter(elem => elem !== null);
                let nodeIndent;
                let elementsIndent;
                const parentVarNode = getVariableDeclaratorNode(node);
                // TODO - come up with a better strategy in future
                if (isNodeFirstInLine(node)) {
                    const parent = node.parent;
                    nodeIndent = getNodeIndent(parent).goodChar;
                    if (!parentVarNode || parentVarNode.loc.start.line !== node.loc.start.line) {
                        if (parent.type !== "VariableDeclarator" || parentVarNode === parentVarNode.parent.declarations[0]) {
                            if (parent.type === "VariableDeclarator" && parentVarNode.loc.start.line === parent.loc.start.line) {
                                nodeIndent += (indentSize * options.VariableDeclarator[parentVarNode.parent.kind]);
                            }
                            else if (parent.type === "ObjectExpression" || parent.type === "ArrayExpression") {
                                const parentElements = node.parent.type === "ObjectExpression" ? node.parent.properties : node.parent.elements;
                                if (parentElements[0] &&
                                    parentElements[0].loc.start.line === parent.loc.start.line &&
                                    parentElements[0].loc.end.line !== parent.loc.start.line) {
                                    /*
                                     * If the first element of the array spans multiple lines, don't increase the expected indentation of the rest.
                                     * e.g. [{
                                     *        foo: 1
                                     *      },
                                     *      {
                                     *        bar: 1
                                     *      }]
                                     * the second object is not indented.
                                     */
                                }
                                else if (typeof options[parent.type] === "number") {
                                    nodeIndent += options[parent.type] * indentSize;
                                }
                                else {
                                    nodeIndent = parentElements[0].loc.start.column;
                                }
                            }
                            else if (parent.type === "CallExpression" || parent.type === "NewExpression") {
                                if (typeof options.CallExpression.arguments === "number") {
                                    nodeIndent += options.CallExpression.arguments * indentSize;
                                }
                                else if (options.CallExpression.arguments === "first") {
                                    if (parent.arguments.includes(node)) {
                                        nodeIndent = parent.arguments[0].loc.start.column;
                                    }
                                }
                                else {
                                    nodeIndent += indentSize;
                                }
                            }
                            else if (parent.type === "LogicalExpression" || parent.type === "ArrowFunctionExpression") {
                                nodeIndent += indentSize;
                            }
                        }
                    }
                    checkFirstNodeLineIndent(node, nodeIndent);
                }
                else {
                    nodeIndent = getNodeIndent(node).goodChar;
                }
                if (options[node.type] === "first") {
                    elementsIndent = elements.length ? elements[0].loc.start.column : 0; // If there are no elements, elementsIndent doesn't matter.
                }
                else {
                    elementsIndent = nodeIndent + indentSize * options[node.type];
                }
                /*
                 * Check if the node is a multiple variable declaration; if so, then
                 * make sure indentation takes that into account.
                 */
                if (isNodeInVarOnTop(node, parentVarNode)) {
                    elementsIndent += indentSize * options.VariableDeclarator[parentVarNode.parent.kind];
                }
                checkNodesIndent(elements, elementsIndent);
                if (elements.length > 0) {
                    // Skip last block line check if last item in same line
                    if (elements[elements.length - 1].loc.end.line === node.loc.end.line) {
                        return;
                    }
                }
                checkLastNodeLineIndent(node, nodeIndent +
                    (isNodeInVarOnTop(node, parentVarNode) ? options.VariableDeclarator[parentVarNode.parent.kind] * indentSize : 0));
            }