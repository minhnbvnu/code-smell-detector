function insertCaptureNewTargetIfNeeded(statements, node, copyOnWrite) {
                if (hierarchyFacts & 32768 /* NewTarget */) {
                    let newTarget;
                    switch (node.kind) {
                        case 216 /* ArrowFunction */:
                            return statements;
                        case 171 /* MethodDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            newTarget = factory2.createVoidZero();
                            break;
                        case 173 /* Constructor */:
                            newTarget = factory2.createPropertyAccessExpression(setEmitFlags(factory2.createThis(), 8 /* NoSubstitution */), "constructor");
                            break;
                        case 259 /* FunctionDeclaration */:
                        case 215 /* FunctionExpression */:
                            newTarget = factory2.createConditionalExpression(factory2.createLogicalAnd(setEmitFlags(factory2.createThis(), 8 /* NoSubstitution */), factory2.createBinaryExpression(setEmitFlags(factory2.createThis(), 8 /* NoSubstitution */), 102 /* InstanceOfKeyword */, factory2.getLocalName(node))), 
                            /*questionToken*/
                            void 0, factory2.createPropertyAccessExpression(setEmitFlags(factory2.createThis(), 8 /* NoSubstitution */), "constructor"), 
                            /*colonToken*/
                            void 0, factory2.createVoidZero());
                            break;
                        default:
                            return Debug.failBadSyntaxKind(node);
                    }
                    const captureNewTargetStatement = factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList([
                        factory2.createVariableDeclaration(factory2.createUniqueName("_newTarget", 16 /* Optimistic */ | 32 /* FileLevel */), 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, newTarget)
                    ]));
                    setEmitFlags(captureNewTargetStatement, 3072 /* NoComments */ | 2097152 /* CustomPrologue */);
                    if (copyOnWrite) {
                        statements = statements.slice();
                    }
                    insertStatementAfterCustomPrologue(statements, captureNewTargetStatement);
                }
                return statements;
            }