function reportIfUnnecessary(node) {
                if (!node.label) {
                    return;
                }
                const labelNode = node.label;
                for (let info = scopeInfo; info !== null; info = info.upper) {
                    if (info.breakable || info.label && info.label.name === labelNode.name) {
                        if (info.breakable && info.label && info.label.name === labelNode.name) {
                            context.report({
                                node: labelNode,
                                messageId: "unexpected",
                                data: labelNode,
                                fix(fixer) {
                                    const breakOrContinueToken = sourceCode.getFirstToken(node);
                                    if (sourceCode.commentsExistBetween(breakOrContinueToken, labelNode)) {
                                        return null;
                                    }
                                    return fixer.removeRange([breakOrContinueToken.range[1], labelNode.range[1]]);
                                }
                            });
                        }
                        return;
                    }
                }
            }