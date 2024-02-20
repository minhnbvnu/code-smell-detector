function visitSourceFile(node) {
                const ancestorFacts = enterSubtree(8064 /* SourceFileExcludes */, 64 /* SourceFileIncludes */);
                const prologue = [];
                const statements = [];
                startLexicalEnvironment();
                const statementOffset = factory2.copyPrologue(node.statements, prologue, 
                /*ensureUseStrict*/
                false, visitor);
                addRange(statements, visitNodes2(node.statements, visitor, isStatement, statementOffset));
                if (taggedTemplateStringDeclarations) {
                    statements.push(factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList(taggedTemplateStringDeclarations)));
                }
                factory2.mergeLexicalEnvironment(prologue, endLexicalEnvironment());
                insertCaptureThisForNodeIfNeeded(prologue, node);
                exitSubtree(ancestorFacts, 0 /* None */, 0 /* None */);
                return factory2.updateSourceFile(node, setTextRange(factory2.createNodeArray(concatenate(prologue, statements)), node.statements));
            }