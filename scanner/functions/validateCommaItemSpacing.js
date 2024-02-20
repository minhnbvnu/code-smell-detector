function validateCommaItemSpacing(previousItemToken, commaToken, currentItemToken, reportItem) {
                // if single line
                if (astUtils.isTokenOnSameLine(commaToken, currentItemToken) &&
                    astUtils.isTokenOnSameLine(previousItemToken, commaToken)) {
                    // do nothing.
                }
                else if (!astUtils.isTokenOnSameLine(commaToken, currentItemToken) &&
                    !astUtils.isTokenOnSameLine(previousItemToken, commaToken)) {
                    const comment = sourceCode.getCommentsAfter(commaToken)[0];
                    const styleType = comment && comment.type === "Block" && astUtils.isTokenOnSameLine(commaToken, comment)
                        ? style
                        : "between";
                    // lone comma
                    context.report({
                        node: reportItem,
                        loc: commaToken.loc,
                        messageId: "unexpectedLineBeforeAndAfterComma",
                        fix: getFixerFunction(styleType, previousItemToken, commaToken, currentItemToken)
                    });
                }
                else if (style === "first" && !astUtils.isTokenOnSameLine(commaToken, currentItemToken)) {
                    context.report({
                        node: reportItem,
                        loc: commaToken.loc,
                        messageId: "expectedCommaFirst",
                        fix: getFixerFunction(style, previousItemToken, commaToken, currentItemToken)
                    });
                }
                else if (style === "last" && astUtils.isTokenOnSameLine(commaToken, currentItemToken)) {
                    context.report({
                        node: reportItem,
                        loc: commaToken.loc,
                        messageId: "expectedCommaLast",
                        fix: getFixerFunction(style, previousItemToken, commaToken, currentItemToken)
                    });
                }
            }