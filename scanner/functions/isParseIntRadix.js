function isParseIntRadix(fullNumberNode) {
                const parent = fullNumberNode.parent;
                return parent.type === "CallExpression" && fullNumberNode === parent.arguments[1] &&
                    (astUtils.isSpecificId(parent.callee, "parseInt") ||
                        astUtils.isSpecificMemberAccess(parent.callee, "Number", "parseInt"));
            }