function createDefaultConstructorBody(node, isDerivedClass) {
                const statements = [];
                resumeLexicalEnvironment();
                factory2.mergeLexicalEnvironment(statements, endLexicalEnvironment());
                if (isDerivedClass) {
                    statements.push(factory2.createReturnStatement(createDefaultSuperCallOrThis()));
                }
                const statementsArray = factory2.createNodeArray(statements);
                setTextRange(statementsArray, node.members);
                const block = factory2.createBlock(statementsArray, 
                /*multiLine*/
                true);
                setTextRange(block, node);
                setEmitFlags(block, 3072 /* NoComments */);
                return block;
            }