function inspectProgramChild(programChild) {
                //if node's code starts at index 0, getPrevChar() returns null (meaning no errors), so change it to '\n'
                let prevChar = sourceCode.getPrevChar(programChild) || "\n",
                    childEndingLine = sourceCode.getEndingLine(programChild),
                    childEndingLineText = sourceCode.getTextOnLine(childEndingLine);

                function report(messageText) {
                    context.report({
                        node: programChild,
                        message: (
                            programChild.type.replace("Statement", "").toLowerCase() +
                            ( programChild.name ? (" '" + programChild.name + "'") : " statement" ) +
                            ": " + messageText
                        )
                    });
                }

                if (prevChar !== "\n") {
                    //either indentation exists, or some other character - both are not allowed
                    if (/\s/.test(prevChar)) {
                        report("There should be no indentation before top-level declaration.");
                    } else {
                        report("There should be no character(s) before top-level declaration.");
                    }
                }

                //if node starts and ends on different lines and its last line starts with a whitespace or multiline/natspec comment, report
                if (
                    sourceCode.getLine(programChild) !== childEndingLine &&
                    /^(\s+)|(\/\*[^*\/]*\*\/)/.test(childEndingLineText)
                ) {
                    context.report({
                        node: programChild,
                        location: {
                            line: childEndingLine,
                            column: 0
                        },
                        message: "Line shouln't have any indentation or comments at the beginning."
                    });
                }

            }