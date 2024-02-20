function checkMembers(members, node, parentId, prefix, postfix, safeFix = true) {
                if (members.length !== 1) {
                    return;
                }
                const [member] = members;
                if (member.type !== utils_1.AST_NODE_TYPES.TSIndexSignature) {
                    return;
                }
                const [parameter] = member.parameters;
                if (!parameter) {
                    return;
                }
                if (parameter.type !== utils_1.AST_NODE_TYPES.Identifier) {
                    return;
                }
                const keyType = parameter.typeAnnotation;
                if (!keyType) {
                    return;
                }
                const valueType = member.typeAnnotation;
                if (!valueType) {
                    return;
                }
                if (parentId) {
                    const scope = context.getScope();
                    const superVar = utils_1.ASTUtils.findVariable(scope, parentId.name);
                    if (superVar) {
                        const isCircular = superVar.references.some(item => item.isTypeReference &&
                            node.range[0] <= item.identifier.range[0] &&
                            node.range[1] >= item.identifier.range[1]);
                        if (isCircular) {
                            return;
                        }
                    }
                }
                context.report({
                    node,
                    messageId: 'preferRecord',
                    fix: safeFix
                        ? (fixer) => {
                            const key = sourceCode.getText(keyType.typeAnnotation);
                            const value = sourceCode.getText(valueType.typeAnnotation);
                            const record = member.readonly
                                ? `Readonly<Record<${key}, ${value}>>`
                                : `Record<${key}, ${value}>`;
                            return fixer.replaceText(node, `${prefix}${record}${postfix}`);
                        }
                        : null,
                });
            }