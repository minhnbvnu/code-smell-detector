function shouldIgnore(node) {
                const a = node;
                const b = node.parent;
                return (!includesBothInAGroup(options.groups, a.operator, b.type === "ConditionalExpression" ? "?:" : b.operator) ||
                    (options.allowSamePrecedence &&
                        astUtils.getPrecedence(a) === astUtils.getPrecedence(b)));
            }