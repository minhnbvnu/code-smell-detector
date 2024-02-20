function insertCaptureThisForNode(statements, node, initializer) {
                enableSubstitutionsForCapturedThis();
                const captureThisStatement = factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(factory2.createUniqueName("_this", 16 /* Optimistic */ | 32 /* FileLevel */), 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer)
                ]));
                setEmitFlags(captureThisStatement, 3072 /* NoComments */ | 2097152 /* CustomPrologue */);
                setSourceMapRange(captureThisStatement, node);
                insertStatementAfterCustomPrologue(statements, captureThisStatement);
            }