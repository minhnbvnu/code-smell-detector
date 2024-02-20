function testForConditionalAncestor(node) {
                const ancestor = findConditionalAncestor(node);
                if (ancestor) {
                    context.report({
                        node,
                        messageId: "unexpected",
                        data: {
                            type: NODE_DESCRIPTIONS[ancestor.type] || ancestor.type
                        }
                    });
                }
            }