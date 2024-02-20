function inspectArgument(argIndent, argIndentDesc, argument) {
                let indentRegExp = new RegExp(`^${argIndent}[^\\s\/]`),
                    argLineText = sourceCode.getTextOnLine(sourceCode.getLine(argument));

                //parameter declaration must be preceded by only correct level of indentation & no comments
                !indentRegExp.test(argLineText) && context.report({
                    node: argument,
                    message: `Only use indent of ${argIndentDesc}.`
                });
            }