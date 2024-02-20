function parseClassElement() {
                        const pos = getNodePos();
                        if (token() === 26 /* SemicolonToken */) {
                            nextToken();
                            return finishNode(factory2.createSemicolonClassElement(), pos);
                        }
                        const hasJSDoc = hasPrecedingJSDocComment();
                        const modifiers = parseModifiers(
                        /*allowDecorators*/
                        true, 
                        /*permitConstAsModifier*/
                        true, 
                        /*stopOnStartOfClassStaticBlock*/
                        true);
                        if (token() === 124 /* StaticKeyword */ && lookAhead(nextTokenIsOpenBrace)) {
                            return parseClassStaticBlockDeclaration(pos, hasJSDoc, modifiers);
                        }
                        if (parseContextualModifier(137 /* GetKeyword */)) {
                            return parseAccessorDeclaration(pos, hasJSDoc, modifiers, 174 /* GetAccessor */, 0 /* None */);
                        }
                        if (parseContextualModifier(151 /* SetKeyword */)) {
                            return parseAccessorDeclaration(pos, hasJSDoc, modifiers, 175 /* SetAccessor */, 0 /* None */);
                        }
                        if (token() === 135 /* ConstructorKeyword */ || token() === 10 /* StringLiteral */) {
                            const constructorDeclaration = tryParseConstructorDeclaration(pos, hasJSDoc, modifiers);
                            if (constructorDeclaration) {
                                return constructorDeclaration;
                            }
                        }
                        if (isIndexSignature()) {
                            return parseIndexSignatureDeclaration(pos, hasJSDoc, modifiers);
                        }
                        if (tokenIsIdentifierOrKeyword(token()) || token() === 10 /* StringLiteral */ || token() === 8 /* NumericLiteral */ || token() === 41 /* AsteriskToken */ || token() === 22 /* OpenBracketToken */) {
                            const isAmbient = some(modifiers, isDeclareModifier);
                            if (isAmbient) {
                                for (const m of modifiers) {
                                    m.flags |= 16777216 /* Ambient */;
                                }
                                return doInsideOfContext(16777216 /* Ambient */, () => parsePropertyOrMethodDeclaration(pos, hasJSDoc, modifiers));
                            }
                            else {
                                return parsePropertyOrMethodDeclaration(pos, hasJSDoc, modifiers);
                            }
                        }
                        if (modifiers) {
                            const name = createMissingNode(79 /* Identifier */, 
                            /*reportAtCurrentPosition*/
                            true, Diagnostics.Declaration_expected);
                            return parsePropertyDeclaration(pos, hasJSDoc, modifiers, name, 
                            /*questionToken*/
                            void 0);
                        }
                        return Debug.fail("Should not have attempted to parse class member declaration.");
                    }