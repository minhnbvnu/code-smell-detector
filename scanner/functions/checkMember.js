function checkMember(member, node, tsThisTypes = null) {
                if ((member.type === utils_1.AST_NODE_TYPES.TSCallSignatureDeclaration ||
                    member.type === utils_1.AST_NODE_TYPES.TSConstructSignatureDeclaration) &&
                    member.returnType !== undefined) {
                    if ((tsThisTypes === null || tsThisTypes === void 0 ? void 0 : tsThisTypes.length) &&
                        node.type === utils_1.AST_NODE_TYPES.TSInterfaceDeclaration) {
                        // the message can be confusing if we don't point directly to the `this` node instead of the whole member
                        // and in favour of generating at most one error we'll only report the first occurrence of `this` if there are multiple
                        context.report({
                            node: tsThisTypes[0],
                            messageId: 'unexpectedThisOnFunctionOnlyInterface',
                            data: {
                                interfaceName: node.id.name,
                            },
                        });
                        return;
                    }
                    const fixable = node.parent &&
                        node.parent.type === utils_1.AST_NODE_TYPES.ExportDefaultDeclaration;
                    const fix = fixable
                        ? null
                        : (fixer) => {
                            const fixes = [];
                            const start = member.range[0];
                            const colonPos = member.returnType.range[0] - start;
                            const text = sourceCode.getText().slice(start, member.range[1]);
                            const comments = sourceCode
                                .getCommentsBefore(member)
                                .concat(sourceCode.getCommentsAfter(member));
                            let suggestion = `${text.slice(0, colonPos)} =>${text.slice(colonPos + 1)}`;
                            const lastChar = suggestion.endsWith(';') ? ';' : '';
                            if (lastChar) {
                                suggestion = suggestion.slice(0, -1);
                            }
                            if (shouldWrapSuggestion(node.parent)) {
                                suggestion = `(${suggestion})`;
                            }
                            if (node.type === utils_1.AST_NODE_TYPES.TSInterfaceDeclaration) {
                                if (node.typeParameters !== undefined) {
                                    suggestion = `type ${sourceCode
                                        .getText()
                                        .slice(node.id.range[0], node.typeParameters.range[1])} = ${suggestion}${lastChar}`;
                                }
                                else {
                                    suggestion = `type ${node.id.name} = ${suggestion}${lastChar}`;
                                }
                            }
                            const isParentExported = node.parent &&
                                node.parent.type === utils_1.AST_NODE_TYPES.ExportNamedDeclaration;
                            if (node.type === utils_1.AST_NODE_TYPES.TSInterfaceDeclaration &&
                                isParentExported) {
                                const commentsText = comments.reduce((text, comment) => {
                                    return (text +
                                        (comment.type === utils_1.AST_TOKEN_TYPES.Line
                                            ? `//${comment.value}`
                                            : `/*${comment.value}*/`) +
                                        '\n');
                                }, '');
                                // comments should move before export and not between export and interface declaration
                                fixes.push(fixer.insertTextBefore(node.parent, commentsText));
                            }
                            else {
                                comments.forEach(comment => {
                                    let commentText = comment.type === utils_1.AST_TOKEN_TYPES.Line
                                        ? `//${comment.value}`
                                        : `/*${comment.value}*/`;
                                    const isCommentOnTheSameLine = comment.loc.start.line === member.loc.start.line;
                                    if (!isCommentOnTheSameLine) {
                                        commentText += '\n';
                                    }
                                    else {
                                        commentText += ' ';
                                    }
                                    suggestion = commentText + suggestion;
                                });
                            }
                            const fixStart = node.range[0];
                            fixes.push(fixer.replaceTextRange([fixStart, node.range[1]], suggestion));
                            return fixes;
                        };
                    context.report({
                        node: member,
                        messageId: 'functionTypeOverCallableType',
                        data: {
                            literalOrInterface: exports.phrases[node.type],
                        },
                        fix,
                    });
                }
            }