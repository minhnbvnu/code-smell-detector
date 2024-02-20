function isIndexOnlyUsedWithArray(body, indexVar, arrayExpression) {
                const sourceCode = context.getSourceCode();
                const arrayText = sourceCode.getText(arrayExpression);
                return indexVar.references.every(reference => {
                    const id = reference.identifier;
                    const node = id.parent;
                    return (!contains(body, id) ||
                        (node !== undefined &&
                            node.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                            node.object.type !== utils_1.AST_NODE_TYPES.ThisExpression &&
                            node.property === id &&
                            sourceCode.getText(node.object) === arrayText &&
                            !isAssignee(node)));
                });
            }