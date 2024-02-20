function checkSorting(node) {
                var _a;
                const sourceOrder = node.types.map(type => {
                    var _a;
                    const group = (_a = groupOrder === null || groupOrder === void 0 ? void 0 : groupOrder.indexOf(getGroup(type))) !== null && _a !== void 0 ? _a : -1;
                    return {
                        group: group === -1 ? Number.MAX_SAFE_INTEGER : group,
                        node: type,
                        text: sourceCode.getText(type),
                    };
                });
                const expectedOrder = [...sourceOrder].sort((a, b) => {
                    if (a.group !== b.group) {
                        return a.group - b.group;
                    }
                    return (collator.compare(a.text, b.text) ||
                        (a.text < b.text ? -1 : a.text > b.text ? 1 : 0));
                });
                const hasComments = node.types.some(type => {
                    const count = sourceCode.getCommentsBefore(type).length +
                        sourceCode.getCommentsAfter(type).length;
                    return count > 0;
                });
                for (let i = 0; i < expectedOrder.length; i += 1) {
                    if (expectedOrder[i].node !== sourceOrder[i].node) {
                        let messageId = 'notSorted';
                        const data = {
                            name: '',
                            type: node.type === utils_1.AST_NODE_TYPES.TSIntersectionType
                                ? 'Intersection'
                                : 'Union',
                        };
                        if (((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration) {
                            messageId = 'notSortedNamed';
                            data.name = node.parent.id.name;
                        }
                        const fix = fixer => {
                            const sorted = expectedOrder
                                .map(t => (0, util_1.typeNodeRequiresParentheses)(t.node, t.text) ||
                                (node.type === utils_1.AST_NODE_TYPES.TSIntersectionType &&
                                    t.node.type === utils_1.AST_NODE_TYPES.TSUnionType)
                                ? `(${t.text})`
                                : t.text)
                                .join(node.type === utils_1.AST_NODE_TYPES.TSIntersectionType ? ' & ' : ' | ');
                            return fixer.replaceText(node, sorted);
                        };
                        return context.report(Object.assign({ node,
                            messageId,
                            data }, (hasComments
                            ? {
                                suggest: [
                                    {
                                        messageId: 'suggestFix',
                                        fix,
                                    },
                                ],
                            }
                            : { fix })));
                    }
                }
            }