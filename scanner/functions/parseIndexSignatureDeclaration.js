function parseIndexSignatureDeclaration(pos, hasJSDoc, modifiers) {
                        const parameters = parseBracketedList(16 /* Parameters */, () => parseParameter(
                        /*inOuterAwaitContext*/
                        false), 22 /* OpenBracketToken */, 23 /* CloseBracketToken */);
                        const type = parseTypeAnnotation();
                        parseTypeMemberSemicolon();
                        const node = factory2.createIndexSignature(modifiers, parameters, type);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }