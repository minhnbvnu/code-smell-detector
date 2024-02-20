function inspectBlockItem(blockIndent, blockIndentDesc, blockItem) {
                let prevChars = sourceCode.getPrevChars(blockItem, blockIndent.length+1),
                    endingLineNum = sourceCode.getEndingLine(blockItem),
                    endingLineRegExp = new RegExp("^" + blockIndent + "(" + BASE_INDENTATION_STYLE + ")?\\S.*$");

                if (prevChars !== ("\n" + blockIndent)) {
                    context.report({
                        node: blockItem,
                        message: `Only use indent of ${blockIndentDesc}.`
                    });
                }

                /**
                 * If the block item spans over multiple lines, make sure the ending line also follows the indent rule
                 * An exception to this is the if-else statements when they don't have BlockStatement as their body
                 * eg-
                 * if (a)
                 *     foo();
                 * else
                 *     bar();
                 *
                 * Another exception is chaining.
                 * eg-
                 * function() {
                 *   myObject
                 *     .funcA()
                 *     .funcB()
                 *     [0];
                 * }
                 * Ending line has 1 extra indentation but this is acceptable.
                 */
                if (
                    blockItem.type !== "IfStatement" &&
                    sourceCode.getLine(blockItem) !== endingLineNum &&
                    !endingLineRegExp.test(sourceCode.getTextOnLine(endingLineNum))
                ) {
                    context.report({
                        node: blockItem,
                        location: {
                            line: endingLineNum,
                            column: 0
                        },
                        message: `Only use indent of ${blockIndentDesc}.`
                    });
                }
            }