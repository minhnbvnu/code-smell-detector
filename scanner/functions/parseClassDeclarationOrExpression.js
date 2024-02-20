function parseClassDeclarationOrExpression(pos, hasJSDoc, modifiers, kind) {
                        const savedAwaitContext = inAwaitContext();
                        parseExpected(84 /* ClassKeyword */);
                        const name = parseNameOfClassDeclarationOrExpression();
                        const typeParameters = parseTypeParameters();
                        if (some(modifiers, isExportModifier))
                            setAwaitContext(
                            /*value*/
                            true);
                        const heritageClauses = parseHeritageClauses();
                        let members;
                        if (parseExpected(18 /* OpenBraceToken */)) {
                            members = parseClassMembers();
                            parseExpected(19 /* CloseBraceToken */);
                        }
                        else {
                            members = createMissingList();
                        }
                        setAwaitContext(savedAwaitContext);
                        const node = kind === 260 /* ClassDeclaration */ ? factory2.createClassDeclaration(modifiers, name, typeParameters, heritageClauses, members) : factory2.createClassExpression(modifiers, name, typeParameters, heritageClauses, members);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }