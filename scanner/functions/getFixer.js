function getFixer(operatorToken, desiredStyle) {
                return fixer => {
                    const tokenBefore = sourceCode.getTokenBefore(operatorToken);
                    const tokenAfter = sourceCode.getTokenAfter(operatorToken);
                    const textBefore = sourceCode.text.slice(tokenBefore.range[1], operatorToken.range[0]);
                    const textAfter = sourceCode.text.slice(operatorToken.range[1], tokenAfter.range[0]);
                    const hasLinebreakBefore = !astUtils.isTokenOnSameLine(tokenBefore, operatorToken);
                    const hasLinebreakAfter = !astUtils.isTokenOnSameLine(operatorToken, tokenAfter);
                    let newTextBefore, newTextAfter;
                    if (hasLinebreakBefore !== hasLinebreakAfter && desiredStyle !== "none") {
                        // If there is a comment before and after the operator, don't do a fix.
                        if (sourceCode.getTokenBefore(operatorToken, { includeComments: true }) !== tokenBefore &&
                            sourceCode.getTokenAfter(operatorToken, { includeComments: true }) !== tokenAfter) {
                            return null;
                        }
                        /*
                         * If there is only one linebreak and it's on the wrong side of the operator, swap the text before and after the operator.
                         * foo &&
                         *           bar
                         * would get fixed to
                         * foo
                         *        && bar
                         */
                        newTextBefore = textAfter;
                        newTextAfter = textBefore;
                    }
                    else {
                        const LINEBREAK_REGEX = astUtils.createGlobalLinebreakMatcher();
                        // Otherwise, if no linebreak is desired and no comments interfere, replace the linebreaks with empty strings.
                        newTextBefore = desiredStyle === "before" || textBefore.trim() ? textBefore : textBefore.replace(LINEBREAK_REGEX, "");
                        newTextAfter = desiredStyle === "after" || textAfter.trim() ? textAfter : textAfter.replace(LINEBREAK_REGEX, "");
                        // If there was no change (due to interfering comments), don't output a fix.
                        if (newTextBefore === textBefore && newTextAfter === textAfter) {
                            return null;
                        }
                    }
                    if (newTextAfter === "" && tokenAfter.type === "Punctuator" && "+-".includes(operatorToken.value) && tokenAfter.value === operatorToken.value) {
                        // To avoid accidentally creating a ++ or -- operator, insert a space if the operator is a +/- and the following token is a unary +/-.
                        newTextAfter += " ";
                    }
                    return fixer.replaceTextRange([tokenBefore.range[1], tokenAfter.range[0]], newTextBefore + operatorToken.value + newTextAfter);
                };
            }