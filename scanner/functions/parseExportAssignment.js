function parseExportAssignment(pos, hasJSDoc, modifiers) {
                        const savedAwaitContext = inAwaitContext();
                        setAwaitContext(
                        /*value*/
                        true);
                        let isExportEquals;
                        if (parseOptional(63 /* EqualsToken */)) {
                            isExportEquals = true;
                        }
                        else {
                            parseExpected(88 /* DefaultKeyword */);
                        }
                        const expression = parseAssignmentExpressionOrHigher(
                        /*allowReturnTypeInArrowFunction*/
                        true);
                        parseSemicolon();
                        setAwaitContext(savedAwaitContext);
                        const node = factory2.createExportAssignment(modifiers, isExportEquals, expression);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }