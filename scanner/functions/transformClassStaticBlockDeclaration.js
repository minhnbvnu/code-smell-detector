function transformClassStaticBlockDeclaration(node) {
                if (lexicalEnvironment) {
                    lexicalEnvironmentMap.set(getOriginalNode(node), lexicalEnvironment);
                }
                if (shouldTransformPrivateElementsOrClassStaticBlocks) {
                    startLexicalEnvironment();
                    let statements = setCurrentStaticPropertyDeclarationOrStaticBlockAnd(node, (statements2) => visitNodes2(statements2, visitor, isStatement), node.body.statements);
                    statements = factory2.mergeLexicalEnvironment(statements, endLexicalEnvironment());
                    const iife = factory2.createImmediatelyInvokedArrowFunction(statements);
                    setOriginalNode(iife, node);
                    setTextRange(iife, node);
                    addEmitFlags(iife, 4 /* AdviseOnEmitNode */);
                    return iife;
                }
            }