function getTemplateLiteral(currentNode, textBeforeNode, textAfterNode) {
                if (currentNode.type === "Literal" && typeof currentNode.value === "string") {
                    /*
                     * If the current node is a string literal, escape any instances of ${ or ` to prevent them from being interpreted
                     * as a template placeholder. However, if the code already contains a backslash before the ${ or `
                     * for some reason, don't add another backslash, because that would change the meaning of the code (it would cause
                     * an actual backslash character to appear before the dollar sign).
                     */
                    return `\`${currentNode.raw.slice(1, -1).replace(/\\*(\$\{|`)/gu, matched => {
                        if (matched.lastIndexOf("\\") % 2) {
                            return `\\${matched}`;
                        }
                        return matched;
                        // Unescape any quotes that appear in the original Literal that no longer need to be escaped.
                    }).replace(new RegExp(`\\\\${currentNode.raw[0]}`, "gu"), currentNode.raw[0])}\``;
                }
                if (currentNode.type === "TemplateLiteral") {
                    return sourceCode.getText(currentNode);
                }
                if (isConcatenation(currentNode) && hasStringLiteral(currentNode)) {
                    const plusSign = sourceCode.getFirstTokenBetween(currentNode.left, currentNode.right, token => token.value === "+");
                    const textBeforePlus = getTextBetween(currentNode.left, plusSign);
                    const textAfterPlus = getTextBetween(plusSign, currentNode.right);
                    const leftEndsWithCurly = endsWithTemplateCurly(currentNode.left);
                    const rightStartsWithCurly = startsWithTemplateCurly(currentNode.right);
                    if (leftEndsWithCurly) {
                        // If the left side of the expression ends with a template curly, add the extra text to the end of the curly bracket.
                        // `foo${bar}` /* comment */ + 'baz' --> `foo${bar /* comment */  }${baz}`
                        return getTemplateLiteral(currentNode.left, textBeforeNode, textBeforePlus + textAfterPlus).slice(0, -1) +
                            getTemplateLiteral(currentNode.right, null, textAfterNode).slice(1);
                    }
                    if (rightStartsWithCurly) {
                        // Otherwise, if the right side of the expression starts with a template curly, add the text there.
                        // 'foo' /* comment */ + `${bar}baz` --> `foo${ /* comment */  bar}baz`
                        return getTemplateLiteral(currentNode.left, textBeforeNode, null).slice(0, -1) +
                            getTemplateLiteral(currentNode.right, textBeforePlus + textAfterPlus, textAfterNode).slice(1);
                    }
                    /*
                     * Otherwise, these nodes should not be combined into a template curly, since there is nowhere to put
                     * the text between them.
                     */
                    return `${getTemplateLiteral(currentNode.left, textBeforeNode, null)}${textBeforePlus}+${textAfterPlus}${getTemplateLiteral(currentNode.right, textAfterNode, null)}`;
                }
                return `\`\${${textBeforeNode || ""}${sourceCode.getText(currentNode)}${textAfterNode || ""}}\``;
            }