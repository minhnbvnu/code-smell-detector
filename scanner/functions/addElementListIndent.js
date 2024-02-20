function addElementListIndent(elements, startToken, endToken, offset) {
                /**
                 * Gets the first token of a given element, including surrounding parentheses.
                 * @param {ASTNode} element A node in the `elements` list
                 * @returns {Token} The first token of this element
                 */
                function getFirstToken(element) {
                    let token = sourceCode.getTokenBefore(element);
                    while (astUtils.isOpeningParenToken(token) && token !== startToken) {
                        token = sourceCode.getTokenBefore(token);
                    }
                    return sourceCode.getTokenAfter(token);
                }
                // Run through all the tokens in the list, and offset them by one indent level (mainly for comments, other things will end up overridden)
                offsets.setDesiredOffsets([startToken.range[1], endToken.range[0]], startToken, typeof offset === "number" ? offset : 1);
                offsets.setDesiredOffset(endToken, startToken, 0);
                // If the preference is "first" but there is no first element (e.g. sparse arrays w/ empty first slot), fall back to 1 level.
                if (offset === "first" && elements.length && !elements[0]) {
                    return;
                }
                elements.forEach((element, index) => {
                    if (!element) {
                        // Skip holes in arrays
                        return;
                    }
                    if (offset === "off") {
                        // Ignore the first token of every element if the "off" option is used
                        offsets.ignoreToken(getFirstToken(element));
                    }
                    // Offset the following elements correctly relative to the first element
                    if (index === 0) {
                        return;
                    }
                    if (offset === "first" && tokenInfo.isFirstTokenOfLine(getFirstToken(element))) {
                        offsets.matchOffsetOf(getFirstToken(elements[0]), getFirstToken(element));
                    }
                    else {
                        const previousElement = elements[index - 1];
                        const firstTokenOfPreviousElement = previousElement && getFirstToken(previousElement);
                        const previousElementLastToken = previousElement && sourceCode.getLastToken(previousElement);
                        if (previousElement &&
                            previousElementLastToken.loc.end.line - countTrailingLinebreaks(previousElementLastToken.value) > startToken.loc.end.line) {
                            offsets.setDesiredOffsets([previousElement.range[1], element.range[1]], firstTokenOfPreviousElement, 0);
                        }
                    }
                });
            }