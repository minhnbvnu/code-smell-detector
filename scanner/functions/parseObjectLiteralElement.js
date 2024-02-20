function parseObjectLiteralElement() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        if (parseOptionalToken(25 /* DotDotDotToken */)) {
                            const expression = parseAssignmentExpressionOrHigher(
                            /*allowReturnTypeInArrowFunction*/
                            true);
                            return withJSDoc(finishNode(factory2.createSpreadAssignment(expression), pos), hasJSDoc);
                        }
                        const modifiers = parseModifiers(
                        /*allowDecorators*/
                        true);
                        if (parseContextualModifier(137 /* GetKeyword */)) {
                            return parseAccessorDeclaration(pos, hasJSDoc, modifiers, 174 /* GetAccessor */, 0 /* None */);
                        }
                        if (parseContextualModifier(151 /* SetKeyword */)) {
                            return parseAccessorDeclaration(pos, hasJSDoc, modifiers, 175 /* SetAccessor */, 0 /* None */);
                        }
                        const asteriskToken = parseOptionalToken(41 /* AsteriskToken */);
                        const tokenIsIdentifier = isIdentifier2();
                        const name = parsePropertyName();
                        const questionToken = parseOptionalToken(57 /* QuestionToken */);
                        const exclamationToken = parseOptionalToken(53 /* ExclamationToken */);
                        if (asteriskToken || token() === 20 /* OpenParenToken */ || token() === 29 /* LessThanToken */) {
                            return parseMethodDeclaration(pos, hasJSDoc, modifiers, asteriskToken, name, questionToken, exclamationToken);
                        }
                        let node;
                        const isShorthandPropertyAssignment2 = tokenIsIdentifier && token() !== 58 /* ColonToken */;
                        if (isShorthandPropertyAssignment2) {
                            const equalsToken = parseOptionalToken(63 /* EqualsToken */);
                            const objectAssignmentInitializer = equalsToken ? allowInAnd(() => parseAssignmentExpressionOrHigher(
                            /*allowReturnTypeInArrowFunction*/
                            true)) : void 0;
                            node = factory2.createShorthandPropertyAssignment(name, objectAssignmentInitializer);
                            node.equalsToken = equalsToken;
                        }
                        else {
                            parseExpected(58 /* ColonToken */);
                            const initializer = allowInAnd(() => parseAssignmentExpressionOrHigher(
                            /*allowReturnTypeInArrowFunction*/
                            true));
                            node = factory2.createPropertyAssignment(name, initializer);
                        }
                        node.modifiers = modifiers;
                        node.questionToken = questionToken;
                        node.exclamationToken = exclamationToken;
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }