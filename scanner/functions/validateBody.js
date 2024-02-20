function validateBody(body) {
                var _a;
                const isSingleLine = body.loc.start.line === body.loc.end.line;
                const members = body.type === utils_1.AST_NODE_TYPES.TSTypeLiteral ? body.members : body.body;
                let alignGroups = [];
                let unalignedElements = [];
                if (options.align || ((_a = options.multiLine) === null || _a === void 0 ? void 0 : _a.align)) {
                    let currentAlignGroup = [];
                    alignGroups.push(currentAlignGroup);
                    let prevNode = undefined;
                    for (const node of members) {
                        let prevAlignedNode = at(currentAlignGroup, -1);
                        if (prevAlignedNode !== prevNode) {
                            prevAlignedNode = undefined;
                        }
                        if (prevAlignedNode && continuesAlignGroup(prevAlignedNode, node)) {
                            currentAlignGroup.push(node);
                        }
                        else if ((prevNode === null || prevNode === void 0 ? void 0 : prevNode.loc.start.line) === node.loc.start.line) {
                            if (prevAlignedNode) {
                                // Here, prevNode === prevAlignedNode === currentAlignGroup.at(-1)
                                unalignedElements.push(prevAlignedNode);
                                currentAlignGroup.pop();
                            }
                            unalignedElements.push(node);
                        }
                        else {
                            currentAlignGroup = [node];
                            alignGroups.push(currentAlignGroup);
                        }
                        prevNode = node;
                    }
                    unalignedElements = unalignedElements.concat(...alignGroups.filter(group => group.length === 1));
                    alignGroups = alignGroups.filter(group => group.length >= 2);
                }
                else {
                    unalignedElements = members;
                }
                for (const group of alignGroups) {
                    checkAlignGroup(group);
                }
                for (const node of unalignedElements) {
                    checkIndividualNode(node, { singleLine: isSingleLine });
                }
            }