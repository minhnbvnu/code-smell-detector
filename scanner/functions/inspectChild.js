function inspectChild(child) {
                let prevChars = sourceCode.getPrevChars(child, BASE_INDENTATION_STYLE.length+1),
                    endingLineNum = sourceCode.getEndingLine(child);

                //if the start of node doesn't follow correct indentation
                if (!levelOneIndentRegExp.test(prevChars)) {
                    context.report({
                        node: child,
                        message: `Only use indent of ${BASE_INDENTATION_STYLE_DESC}.`
                    });
                }

                // If the node starts & ends on same line, exit.
                if (sourceCode.getLine(child) === endingLineNum) {
                    return;
                }

                // If node starts & ends on diff lines, the ending line must also follow correct indentation.
                // For abstract funcs, ending line should have either same level of indent as start or 1 extra level. Eg-
                //
                // function foo()
                //     payable
                //     returns (uint, string);
                //
                // function foo(
                //     uint x,
                //     string y
                // ) payable returns (uint);
                //
                // TODO: Allow the latter case (see issue #268)

                if (child.type === "FunctionDeclaration" && child.is_abstract) {

                    if (!endingLineExtraIndentRegExp.test(
                        sourceCode.getTextOnLine(endingLineNum).slice(0, BASE_INDENTATION_STYLE.repeat(2).length+1))) {
                        context.report({
                            node: child,
                            location: {
                                line: endingLineNum,
                                column: 0
                            },
                            message: `Only use indent of ${BASE_INDENTATION_STYLE_DESC}.`
                        });
                    }

                    return;
                }

                if (
                    !endingLineRegExp.test(
                        sourceCode.getTextOnLine(endingLineNum).slice(0, BASE_INDENTATION_STYLE.length+1)
                    )
                ) {
                    context.report({
                        node: child,
                        location: {
                            line: endingLineNum,
                            column: 0
                        },
                        message: `Only use indent of ${BASE_INDENTATION_STYLE_DESC}.`
                    });
                }
            }