function reportIfTooManyStatements(node, count, max) {
                if (count > max) {
                    const name = upperCaseFirst(astUtils.getFunctionNameWithKind(node));
                    context.report({
                        node,
                        messageId: "exceed",
                        data: { name, count, max }
                    });
                }
            }