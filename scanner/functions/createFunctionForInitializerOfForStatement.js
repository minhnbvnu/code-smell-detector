function createFunctionForInitializerOfForStatement(node, currentState) {
                const functionName = factory2.createUniqueName("_loop_init");
                const containsYield = (node.initializer.transformFlags & 1048576 /* ContainsYield */) !== 0;
                let emitFlags = 0 /* None */;
                if (currentState.containsLexicalThis)
                    emitFlags |= 16 /* CapturesThis */;
                if (containsYield && hierarchyFacts & 4 /* AsyncFunctionBody */)
                    emitFlags |= 524288 /* AsyncFunctionBody */;
                const statements = [];
                statements.push(factory2.createVariableStatement(
                /*modifiers*/
                void 0, node.initializer));
                copyOutParameters(currentState.loopOutParameters, 2 /* Initializer */, 1 /* ToOutParameter */, statements);
                const functionDeclaration = factory2.createVariableStatement(
                /*modifiers*/
                void 0, setEmitFlags(factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(functionName, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, setEmitFlags(factory2.createFunctionExpression(
                    /*modifiers*/
                    void 0, containsYield ? factory2.createToken(41 /* AsteriskToken */) : void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, 
                    /*parameters*/
                    void 0, 
                    /*type*/
                    void 0, Debug.checkDefined(visitNode(factory2.createBlock(statements, 
                    /*multiLine*/
                    true), visitor, isBlock))), emitFlags))
                ]), 4194304 /* NoHoisting */));
                const part = factory2.createVariableDeclarationList(map(currentState.loopOutParameters, createOutVariable));
                return { functionName, containsYield, functionDeclaration, part };
            }