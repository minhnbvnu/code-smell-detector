function isCapAllowed(allowedMap, node, calleeName, pattern) {
                const sourceText = sourceCode.getText(node.callee);
                if (allowedMap[calleeName] || allowedMap[sourceText]) {
                    return true;
                }
                if (pattern && pattern.test(sourceText)) {
                    return true;
                }
                const callee = astUtils.skipChainExpression(node.callee);
                if (calleeName === "UTC" && callee.type === "MemberExpression") {
                    // allow if callee is Date.UTC
                    return callee.object.type === "Identifier" &&
                        callee.object.name === "Date";
                }
                return skipProperties && callee.type === "MemberExpression";
            }