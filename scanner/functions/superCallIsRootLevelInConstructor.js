function superCallIsRootLevelInConstructor(superCall, body) {
                const superCallParent = walkUpParenthesizedExpressions(superCall.parent);
                return isExpressionStatement(superCallParent) && superCallParent.parent === body;
            }