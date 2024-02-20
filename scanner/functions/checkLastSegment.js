function checkLastSegment(node) {
                if (funcInfo.shouldCheck &&
                    funcInfo.codePath.currentSegments.some(isReachable)) {
                    context.report({
                        node,
                        loc: astUtils.getFunctionHeadLoc(node, sourceCode),
                        messageId: funcInfo.hasReturn ? "expectedAlways" : "expected",
                        data: {
                            name: astUtils.getFunctionNameWithKind(funcInfo.node)
                        }
                    });
                }
            }