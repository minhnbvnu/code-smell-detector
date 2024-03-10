function inspectIfStatement(emitted) {
            let node = emitted.node;

            if (emitted.exit) {
                return;
            }

            //rules for consequents of if/else if/else				
            let ifConsequentType = node.consequent.type,
                nodeStartingLine = sourceCode.getLine(node);
            let consequentStartingLine = sourceCode.getLine(node.consequent),
                consequentEndingLine = sourceCode.getEndingLine(node.consequent);

            if (ifConsequentType === "EmptyStatement") {

                context.report({
                    node: node.consequent,
                    message: "Clause is followed by an empty statement."
                });

            } else if (ifConsequentType === "BlockStatement") {

                //if the complete test lies on the same line as the 'if' token but the brace doesn't, report
                if (nodeStartingLine === sourceCode.getEndingLine(node.test)) {
                    if (sourceCode.getLine(node.consequent) !== nodeStartingLine) {

                        context.report({
                            node: node.consequent,
                            message: "Opening brace must be on the same line as the 'if' token."
                        });

                    } else {

                        //if the brace IS on the same line, ensure that only a single space exists between it and test
                        (!/^[^\s\/] $/.test(sourceCode.getPrevChars(node.consequent, 2))) && context.report({
                            node: node.consequent,
                            message: "Only use single space between condition and opening brace."
                        });

                    }
                }

            } else {
                /**
				 * If consequent is a single item:
				 *     1. It should be on the line immediately after the test
				 *     2. It should completely reside on a single line
				 */
                if (consequentStartingLine !== sourceCode.getEndingLine(node.test) + 1) {
                    context.report({
                        node: node.consequent,
                        message: "Consequent should exist exactly on the line after condition."
                    });
                } else if (consequentEndingLine !== consequentStartingLine) {
                    context.report({
                        node: node.consequent,
                        message: "Consequent must reside on a single line only."
                    });
                }
            }

            let alternate = node.alternate;

            if (!alternate) {
                return;
            }

            let alternateLine = sourceCode.getLine(alternate);

            /**
			 * If consequent is a BlockStatement, then alternate & 'else' must begin on the same line as ending brace of consequent
			 * Otherwise, 'else' must exist on the line immediately after the finishing line of the consequent
			 */
            if (ifConsequentType === "BlockStatement") {
                if (
                    (alternate.type === "BlockStatement" || alternate.type === "IfStatement") &&
					alternateLine !== consequentEndingLine
                ) {
                    return context.report({
                        node: alternate,
                        message: "Alternate 'else' must begin on the same line as if's closing brace."
                    });
                }
            } else {
                let nextLineText;

                try {
                    nextLineText = sourceCode.getTextOnLine(consequentEndingLine + 1);
                } catch (e) {
                    //if next line doesn't exist, i.e., consequentEndingLine is the last line in the program
                    nextLineText = "";
                }

                //ensure that consequent is followed by 'else' token on the next line
                if (!/^\s*else/.test(nextLineText)) {
                    return context.report({
                        node: node.consequent,
                        location: {
                            line: consequentEndingLine
                        },
                        message: "'else' clause should start on the line after if consequent."
                    });
                }
            }

            //if alternate is another 'if' statement (,i.e., else if (..) {..}), below rules don't apply
            if (alternate.type === "IfStatement") {
                return;
            }

            if (alternate.type === "EmptyStatement") {
                return context.report({
                    node: alternate,
                    message: "'else' is followed by an empty statement."
                });
            }

            if (alternate.type === "BlockStatement") {
                if (!/^[^\s\/] $/.test(sourceCode.getPrevChars(alternate, 2))) {

                    //if the brace IS on the same line, ensure that only a single space exists between it and test
                    context.report({
                        node: alternate,
                        message: "Only use single space between 'else' and opening brace."
                    });

                }

                return;
            }

            //ensure that 'else' token is followed by statement on the next line (when statement is neither EmptyStatement nor inside a block)
            if (sourceCode.getLine(alternate) !== consequentEndingLine + 2) {
                return context.report({
                    node: alternate,
                    message: "Alternate clause should exist on line after 'else'."
                });
            }

            //if alternate is a single statement (not inside block), it must completely reside on a single line
            (sourceCode.getLine(alternate) !== sourceCode.getEndingLine(alternate)) && context.report({
                node: alternate,
                message: "Entire statement must reside on a single line."
            });
        }