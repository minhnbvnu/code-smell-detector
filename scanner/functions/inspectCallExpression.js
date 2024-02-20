function inspectCallExpression(emitted) {

            let node = emitted.node;
            let endingLineNum = sourceCode.getEndingLine(node),
                callExpressionLineText, currentIndent, currentIndentLevel;

            function inspectArgument(argIndent, argIndentDesc, argument) {
                let indentRegExp = new RegExp(`^${argIndent}[^\\s\/]`),
                    argLineText = sourceCode.getTextOnLine(sourceCode.getLine(argument));

                //parameter declaration must be preceded by only correct level of indentation & no comments
                !indentRegExp.test(argLineText) && context.report({
                    node: argument,
                    message: `Only use indent of ${argIndentDesc}.`
                });
            }

            // Return if the call starts & ends on same line
            // Also return if the callee is NOT an identifier, else rule creates false positives
            // eg-
            // foo()
            //     .bar(10, "hello");
            //
            // baz(10, "hello");
            //
            // In first eg, rule will lint at args for indent because it thinks the call spans over multiple lines
            if (emitted.exit ||
                sourceCode.getLine(node) === endingLineNum || node.callee.type !== "Identifier") {
                return;
            }

            callExpressionLineText = sourceCode.getTextOnLine(sourceCode.getLine(node));

            currentIndent = callExpressionLineText.slice(
                0,
                callExpressionLineText.indexOf(callExpressionLineText.trim())
            );

            currentIndentLevel = (currentIndent.match(BASE_INDENTATION_STYLE_REGEXP_GLOBAL) || []).length;

            //ensure that there is only whitespace of correct level on the line containing parameter
            if (getIndentString(BASE_INDENTATION_STYLE, currentIndentLevel) !== currentIndent) {
                return;	//exit now, we can' proceed further unless this is fixed
            }

            const argIndent = getIndentString(BASE_INDENTATION_STYLE, currentIndentLevel + 1);
            const argIndentDesc = getIndentDescription(BASE_INDENTATION_STYLE, currentIndentLevel + 1);

            node.arguments.forEach(inspectArgument.bind(null, argIndent, argIndentDesc));

        }