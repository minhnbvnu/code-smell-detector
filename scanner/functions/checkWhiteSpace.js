function checkWhiteSpace(node) {
                const operator = sourceCode.getFirstToken(node), nextToken = sourceCode.getTokenAfter(operator), hasWhitespace = sourceCode.isSpaceBetweenTokens(operator, nextToken);
                let type;
                switch (node.type) {
                    case "SpreadElement":
                        type = "spread";
                        if (node.parent.type === "ObjectExpression") {
                            type += " property";
                        }
                        break;
                    case "RestElement":
                        type = "rest";
                        if (node.parent.type === "ObjectPattern") {
                            type += " property";
                        }
                        break;
                    case "ExperimentalSpreadProperty":
                        type = "spread property";
                        break;
                    case "ExperimentalRestProperty":
                        type = "rest property";
                        break;
                    default:
                        return;
                }
                if (alwaysSpace && !hasWhitespace) {
                    context.report({
                        node,
                        loc: operator.loc,
                        messageId: "expectedWhitespace",
                        data: {
                            type
                        },
                        fix(fixer) {
                            return fixer.replaceTextRange([operator.range[1], nextToken.range[0]], " ");
                        }
                    });
                }
                else if (!alwaysSpace && hasWhitespace) {
                    context.report({
                        node,
                        loc: {
                            start: operator.loc.end,
                            end: nextToken.loc.start
                        },
                        messageId: "unexpectedWhitespace",
                        data: {
                            type
                        },
                        fix(fixer) {
                            return fixer.removeRange([operator.range[1], nextToken.range[0]]);
                        }
                    });
                }
            }