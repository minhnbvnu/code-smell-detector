function isConflicted(precedingToken, node) {
                return (astUtils.isArrowToken(precedingToken) ||
                    (astUtils.isKeywordToken(precedingToken) &&
                        !isFunctionBody(node)) ||
                    (astUtils.isColonToken(precedingToken) &&
                        node.parent &&
                        node.parent.type === "SwitchCase" &&
                        precedingToken === astUtils.getSwitchCaseColonToken(node.parent, sourceCode)));
            }