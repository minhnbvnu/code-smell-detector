function disallowBuiltIns(node) {
                const callee = astUtils.skipChainExpression(node.callee);
                if (callee.type !== "MemberExpression") {
                    return;
                }
                const propName = astUtils.getStaticPropertyName(callee);
                if (propName !== null && DISALLOWED_PROPS.has(propName)) {
                    context.report({
                        messageId: "prototypeBuildIn",
                        loc: callee.property.loc,
                        data: { prop: propName },
                        node
                    });
                }
            }